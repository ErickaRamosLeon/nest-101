import { Transaction } from "./transactions.model";

export abstract class TransactionsDao {
    abstract allTransactions(): Promise<Transaction[]>
    abstract saveTransaction(transaction: Transaction): Promise<Transaction>

}
export const transactionsDao = 'TransactionsDao'