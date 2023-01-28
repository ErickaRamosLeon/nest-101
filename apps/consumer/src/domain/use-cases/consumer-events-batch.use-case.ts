import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Transaction, Event } from '../model';
import { IJSON_SCHEMA, ISCHEMA_REGISTRY, SchemaRegistryService, JsonSchemaService } from '@libs/schema-registry'
import { GetEventsUseCase } from './get-events.use-case';
import { GetTransactionsUseCase } from './get-transactions.use-case';
import {TRANSACTION_EVENT_APPLIER_PORT, TransactionEventApplierPort} from "../ports";

const indexArrayOfObject = (array: Array<object>, field: string) => {
  const ret = {};
  array.forEach(element => {
    const fieldValue = element[field];
    if (!Array.isArray(ret[fieldValue])) {
      ret[fieldValue] = [];
    }

    ret[fieldValue].push(element);
  });
  return ret;

}

const INTERVAL_MS = 5000
const N_EVENTS = 3

@Injectable()
export class ConsumerEventsBatchUseCase {
  constructor(   
    @Inject(ISCHEMA_REGISTRY) private readonly schemaRegistryService: SchemaRegistryService,
    @Inject(IJSON_SCHEMA) private readonly jsonSchemaService:JsonSchemaService,    
    @Inject(TRANSACTION_EVENT_APPLIER_PORT) private readonly transactionEventApplierService: TransactionEventApplierPort,
    private readonly getEventsUseCase: GetEventsUseCase,
    private readonly getTransactionsUseCase: GetTransactionsUseCase,    
  ) {}

  async processEvents(nEvents: number) {   
    const events = await this.getEventsUseCase.getNotProcessedEvents(nEvents);   
    
    const eventsIndexedByTransactionId = indexArrayOfObject(events, 'transactionId');

    const transactions = await this.getTransactionsUseCase.getTransactions(Object.keys(eventsIndexedByTransactionId));
    
    const updatedTransactions = []

    for (const transaction of transactions) {    
      let updatedTransaction = this.applyEventsToTransaction(transaction, eventsIndexedByTransactionId[transaction.transactionId]);      
      const schema = await this.schemaRegistryService.getSchema(updatedTransaction['flowId']);      
      const valid = this.jsonSchemaService.validate(schema, updatedTransaction)      
      updatedTransactions.push(updatedTransaction)
    // TODO is not valid
    }
    
    await this.getEventsUseCase.processEvents(events);
    
    await this.getTransactionsUseCase.updateTransactions(updatedTransactions);
  }

  applyEventsToTransaction(transaction: Transaction, events: Event[]): Transaction {
   let updatedTransaction = transaction;
   events
     .sort((a: Event, b: Event) => a.serial - b.serial) // para que el orden no sea 1,10,11,2,20     
     .forEach(
       (event: Event) => updatedTransaction = this.transactionEventApplierService.applyEventToTransaction(updatedTransaction, event)
     )
     //.map((event)=> updatedTransaction = this.transactionEventApplierService.applyEventToTransaction(updatedTransaction, event))

   return updatedTransaction;
  }

  //@Interval(INTERVAL_MS)
  public async consumerCron() {
  console.log('consumerCron with N_EVENTS = ', N_EVENTS);
    await this.processEvents(N_EVENTS);
    console.log('consumerCron finished!');
  }
}