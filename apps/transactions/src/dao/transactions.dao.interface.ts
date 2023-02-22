import { Transaction } from "../transactions.model";

export interface TransactionsDao {    
    saveTransaction(transaction: Transaction): Promise<Transaction>

}
export const TRANSACTION_DAO = 'TransactionsDao'