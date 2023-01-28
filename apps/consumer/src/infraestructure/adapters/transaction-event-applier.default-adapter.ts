import { Event, Transaction, EventType, TransactionEventApplierPort } from "../../domain";

class TransactionEventApplierDefaultAdapter implements TransactionEventApplierPort {
  applyEventToTransaction(transaction: Transaction, event: Event): Transaction {
    switch (event.type) {
      case EventType.status_changed:
        transaction.status['value'] = event.data['status'];
        break;
      case EventType.step_changed:
        transaction.currentStep['value'] = event.data['step'];
        break;
    }
    transaction.timeline.push(event);
    return transaction;
  }
}