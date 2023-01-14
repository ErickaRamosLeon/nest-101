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
    {
      JSONSchemaFaker.option({
        useDefaultValue: true,
        alwaysFakeOptionals: true
      });
    }
      
  async findAll(): Promise<Transaction[]> {
    return await this.transactionsDao.allTransactions() ;
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {    
    const now = new Date();
    const transactionDate = new Date(transaction.time);
    const schema = await this.schemaRegistryService.getSchema(transaction.flowId);
        
    let transactionSkeleton: Transaction = JSON.parse(JSON.stringify(JSONSchemaFaker.generate(schema)));
    console.log('schemaTransaction', transactionSkeleton)

    if (transactionDate.getTime() > now.getTime()) {
      throw new TransactionTimeIsFutureException(transaction.time)
    }

    if (transaction.customId.length > 8) {      
      throw new TransactionCustomIdIsInvalidException(transaction.customId);
    }
    
    const transactionId = uuidv4();

    transactionSkeleton.transactionId = transactionId;
    transactionSkeleton.flowId = transaction.flowId;
    transactionSkeleton.customId = transaction.customId;
    transactionSkeleton.time = transaction.time;
    
    const newTransaction = { 
      ...transactionSkeleton,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()      
    }
    console.log('data', newTransaction)
    const valid = this.JsonSchemaService.validate(schema, newTransaction)
    
    if (!valid) {    
      throw new TransactionDoesntComplySchemaException(schema);
    }

    return await this.transactionsDao.saveTransaction(newTransaction);
  }
}
