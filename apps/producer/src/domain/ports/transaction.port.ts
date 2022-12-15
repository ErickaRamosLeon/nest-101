import { Transaction } from '../model/transaction.model';

export interface TransactionsPort {
  getTransaction(transactionId: string): Promise<Transaction>;
}

export const TRANSACTION_PORT = 'TransactionsPort';
