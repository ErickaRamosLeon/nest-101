import { Event, Transaction } from "../model";

export interface TransactionEventApplierPort {
  applyEventToTransaction(transaction: Transaction, event: Event): Transaction;
}

export const TRANSACTION_EVENT_APPLIER_PORT = 'TransactionEventApplierPort';