import { Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Transaction, Event } from '../model';
import { IJSON_SCHEMA, ISCHEMA_REGISTRY, SchemaRegistryService, JsonSchemaService } from '@app/schema-registry'
import { GetEventsUseCase } from './get-events.use-case';
import { GetTransactionsUseCase } from './get-transactions.use-case';

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
    private readonly getEventsUseCase: GetEventsUseCase,
    private readonly getTransactionsUseCase: GetTransactionsUseCase
  ) {}

  async processEvents(nEvents: number) {   
    const events = await this.getEventsUseCase.getNotProcessedEvents(nEvents);   
    
    const eventsIndexedByTransactionId = indexArrayOfObject(events, 'transactionId');    
    console.log('events', eventsIndexedByTransactionId)

    const transactions = await this.getTransactionsUseCase.getTransactions(Object.keys(eventsIndexedByTransactionId));
    
    for (const transaction of transactions) {
      console.log('transaction', transaction)
      this.applyEventsToTransaction(eventsIndexedByTransactionId[transaction.transactionId], transaction);
      console.log('applyEvents', transaction['flowId'])
      const schema = await this.schemaRegistryService.getSchema(transaction['flowId']);
      console.log('schema consumer', schema)
      const valid = this.jsonSchemaService.validate(schema, transaction)      
      console.log('valid', valid)
    }
    
    await this.getEventsUseCase.processEvents(events);
    
    await this.getTransactionsUseCase.updateTransactions(transactions);
  }

  applyEventsToTransaction(events: Array<Event>, transaction: Transaction) {       
    events.sort((a: Event, b: Event) => a.serial - b.serial).forEach((e: Event) => {
      transaction.data.push(e);      
      transaction.updatedAt = new Date()
    });    
  }

  //@Interval(INTERVAL_MS)
  public async consumerCron() {
    console.log('n_eventos') 
    this.processEvents(N_EVENTS)
    console.log('processed...') 

  }
}