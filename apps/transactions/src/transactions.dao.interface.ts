import { Transaction } from "./transactions.model";

export interface TransactionsDao {
    allTransactions(): Promise<Transaction[]>
    saveTransaction(transaction: Transaction): Promise<Transaction>

}
export const TRANSACTION_DAO = 'TransactionsDao'