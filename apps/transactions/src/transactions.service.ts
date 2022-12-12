import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionCustomIdIsInvalidException } from './exception/transaction-custom-id-is-invalid.exception';
import { Transaction } from './transactions.model';
import { transactionsDao, TransactionsDao } from './transactions.dao';
import { TransactionTimeIsFutureException } from './exception/transaction-time-is-future.exception';

@Injectable()
export class TransactionsService {

  constructor(@Inject(transactionsDao) private readonly transactionsDao: TransactionsDao) {}
  
  async findAll(): Promise<Transaction[]> {
    return await this.transactionsDao.allTransactions() ;
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {    
    const now = new Date();
    const transactionDate = new Date(transaction.time);

    if (transactionDate.getTime() > now.getTime()) {
      throw new TransactionTimeIsFutureException(transaction.time)
           }

    if (transaction.customId.length > 8) {
      throw new TransactionCustomIdIsInvalidException(transaction.customId);
    }
    
    transaction.transactionId = uuidv4();

    return await this.transactionsDao.saveTransaction(transaction);
  }
}
