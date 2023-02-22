import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './transactions.model';
import { TRANSACTION_DAO, TransactionsDao } from './dao/transactions.dao.interface';
import { 
  TransactionDoesntComplySchemaException,
  TransactionSchemaNotFoundException 
} from './exception';
import { IJSON_SCHEMA, ISCHEMA_REGISTRY, SchemaRegistryService, JsonSchemaService } from '@libs/schema-registry'
import { JSONSchemaFaker } from 'json-schema-faker'

@Injectable()
export class TransactionsService {

  constructor(
    @Inject(TRANSACTION_DAO) private readonly transactionsDao: TransactionsDao,
    @Inject(ISCHEMA_REGISTRY) private readonly schemaRegistryService: SchemaRegistryService,
    @Inject(IJSON_SCHEMA) private readonly JsonSchemaService: JsonSchemaService
    ) 
    {
      JSONSchemaFaker.option({
        useDefaultValue: true,
        alwaysFakeOptionals: true
      });
    }   


  async createTransaction(transaction: Transaction): Promise<Transaction> {    
    const now = new Date();

    const schema = await this.schemaRegistryService.getSchema(transaction.flowId)

    if (!schema) {
      throw new TransactionSchemaNotFoundException(transaction.flowId);
    }
        
    let transactionSkeleton: Transaction = JSON.parse(JSON.stringify(JSONSchemaFaker.generate(schema)));    
    
    transactionSkeleton.transactionId = uuidv4();
    transactionSkeleton.flowId = transaction.flowId;
    transactionSkeleton.customId = transaction.customId;
    transactionSkeleton.time = transaction.time;
    transactionSkeleton.createdAt = now.toISOString();
    transactionSkeleton.updatedAt = now.toISOString();
    transactionSkeleton.currentStep['time'] = now.toISOString();
    transactionSkeleton.status['time'] = now.toISOString();

    const valid = this.JsonSchemaService.validate(schema, transactionSkeleton)

    if (!valid) {    
      throw new TransactionDoesntComplySchemaException(schema);
    }

    return await this.transactionsDao.saveTransaction(transactionSkeleton);
  }
}
