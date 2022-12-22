import { Transaction } from "../model/transaction.model";


export interface TransactionsPort {
  getTransaction(transactionId: string): Promise<Transaction>;
  getTransactions(transactionIds: string[]): Promise<Transaction[]>;
  updateTransactions(transaction: Transaction[]): Promise<any>;
}


export const TRANSACTION_PORT = 'TransactionsPort';
