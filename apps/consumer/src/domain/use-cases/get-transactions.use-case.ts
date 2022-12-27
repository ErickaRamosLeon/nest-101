import { validate } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';

import { TransactionsPort, TRANSACTION_PORT } from '../ports';
import { Transaction } from '../model';
import { TransactionIdIsNotValidException, TransactionNotFoundException } from '../exception';
import { PostgresTransactionsAdapter } from '../../infraestructure';

@Injectable()
export class GetTransactionsUseCase {
  //en el constructor se inyecta lo mas generico, en este caso el port
  constructor(@Inject(TRANSACTION_PORT) private readonly transactionsPort: TransactionsPort) {}  

  async getTransactions(transactionIds: string[]): Promise<Transaction[]> {   
    for (const transactionId of transactionIds) {      
      if (!validate(transactionId)) {        
        throw new TransactionIdIsNotValidException(transactionId);
      }
    }        
    return this.transactionsPort.getTransactions(transactionIds);
  }

  async updateTransactions(transactions: Transaction[]): Promise<any> {    
    const updateTransactions = this.transactionsPort.updateTransactions(transactions)    
    return updateTransactions;
  }
}