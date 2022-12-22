import { validate } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';

import { TransactionsPort, TRANSACTION_PORT } from '../ports';
import { Transaction } from '../model';
import { TransactionIdIsNotValidException, TransactionNotFoundException } from '../exception';

@Injectable()
export class GetTransactionsUseCase {
  constructor(@Inject(TRANSACTION_PORT) private readonly transactionsPort: TransactionsPort) {}

  async getTransaction(transactionId: string): Promise<Transaction> {
  
    if (!validate(transactionId)) {
      throw new TransactionIdIsNotValidException(transactionId);
    }

    const transaction = await this.transactionsPort.getTransaction(transactionId);

    if (transaction === null) {
      throw new TransactionNotFoundException(transactionId);
    }

    return transaction;
  }

  async getTransactions(transactionIds: string[]): Promise<Transaction[]> {
    for (const transactionId of transactionIds) {
      if (!validate(transactionId)) {
        throw new TransactionIdIsNotValidException(transactionId);
      }
    }

    return this.transactionsPort.getTransactions(transactionIds);
  }

  async updateTransactions(transactions: Transaction[]): Promise<any> {
    return this.transactionsPort.updateTransactions(transactions);
  }
}