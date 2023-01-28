import { Event, Transaction, EventType, TransactionEventApplierPort } from "../../domain";

const REDUCERS = {
  [EventType.status_changed]: (transaction: Transaction, event: Event) => (
    {
      ...transaction,
      status: {
        ...transaction.status,
        value: event.data['status']
      },
      timeline: [
        ...transaction.timeline,
        event
      ]
    }
  ),
  [EventType.step_changed]: (transaction: Transaction, event: Event) => (
    {
      ...transaction,
      currentStep: {
        ...transaction.currentStep,
        value: event.data['step']
      },
      timeline: [
        ...transaction.timeline,
        event
      ]
    }
  ),
};

export class TransactionEventApplierReducerAdapter implements TransactionEventApplierPort {
  applyEventToTransaction(transaction: Transaction, event: Event): Transaction {
    const reducer = REDUCERS[event.type];
    const appliedTransaction = reducer(transaction, event)
    return appliedTransaction;
  }
}