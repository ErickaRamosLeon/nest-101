import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionCustomIdIsInvalidException } from './exception/transaction-custom-id-is-invalid.exception';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsService {

  private transactions: Transaction[] = [
    {
      transactionId: uuidv4(),
      customId: '3',
      time: new Date(),
    },
    {
      transactionId: uuidv4(),
      customId: '4',
      time: new Date(),
    },
    {
      transactionId: uuidv4(),
      customId: '5',
      time: new Date(),
    },
    
  ];

  findAll(): Transaction[] {
    return this.transactions;
  }

  createTransaction(transaction: Transaction): Transaction {    
    const now = new Date();
    const transactionDate = new Date(transaction.time);

    if (transactionDate.getTime() > now.getTime()) {
       
    }

    if (transaction.customId.length > 8) {
      throw new TransactionCustomIdIsInvalidException(transaction.customId);
    }
    

    transaction.transactionId = uuidv4();
    this.transactions.push(transaction)


    return transaction;
  }
}
