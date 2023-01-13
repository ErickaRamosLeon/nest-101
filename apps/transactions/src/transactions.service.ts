import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionCustomIdIsInvalidException } from './exception/transaction-custom-id-is-invalid.exception';
import { Transaction } from './transactions.model';
import { transactionsDao, TransactionsDao } from './transactions.dao';
import { TransactionTimeIsFutureException } from './exception/transaction-time-is-future.exception';
import { IJSON_SCHEMA, ISCHEMA_REGISTRY, SchemaRegistryService, JsonSchemaService } from '@app/schema-registry'
import { JSONSchemaFaker } from 'json-schema-faker'
import { TransactionDoesntComplySchemaException } from './exception/transaction-doesnt-comply-schema.exception';


@Injectable()
export class TransactionsService {

  constructor(
    @Inject(transactionsDao) private readonly transactionsDao: TransactionsDao,
    @Inject(ISCHEMA_REGISTRY) private readonly schemaRegistryService: SchemaRegistryService,
    @Inject(IJSON_SCHEMA) private readonly JsonSchemaService: JsonSchemaService) 
    {}
      
  async findAll(): Promise<Transaction[]> {
    return await this.transactionsDao.allTransactions() ;
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {    
    const now = new Date();
    const transactionDate = new Date(transaction.time);
    const schema = await this.schemaRegistryService.getSchema(transaction.flowId)
    
    let schemaTransaction = JSONSchemaFaker.generate(schema)    

    console.log('schemaTransaction', schemaTransaction)

    if (transactionDate.getTime() > now.getTime()) {
      throw new TransactionTimeIsFutureException(transaction.time)
    }

    if (transaction.customId.length > 8) {      
      throw new TransactionCustomIdIsInvalidException(transaction.customId);
    }
    
    transaction.transactionId = uuidv4();

    //schemaTransaction.customId = 


    

    if (!this.JsonSchemaService.validate(schema, transaction)) {
      throw new TransactionDoesntComplySchemaException(schema);
    }


    return await this.transactionsDao.saveTransaction(transaction);
  }
}
