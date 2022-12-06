import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTransactionDto } from './dto/create-transaction.dto';
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
    transaction.transactionId = uuidv4();
    this.transactions.push(transaction)

    return transaction;
  }
}
