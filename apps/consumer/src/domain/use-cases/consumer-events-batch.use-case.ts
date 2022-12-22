import { Injectable } from '@nestjs/common';
import { Transaction, Event } from '../model';
import { GetEventsUseCase } from './get-events.use-case';
import { GetTransactionsUseCase } from './get-transactions.use-case';

const indexArrayOfObject = (array: Array<object>, field: string, unique: boolean) => {
  const ret = {};
  array.forEach(element => {
    const fieldValue = element[field];

    if (unique) {
      ret[fieldValue] = element;
      return;
    }

    if (!Array.isArray(ret[fieldValue])) {
      ret[fieldValue] = [];
    }

    ret[fieldValue].push(element);
  });
  return ret;
}

@Injectable()
export class ConsumerEventsBatchUseCase {
  constructor(
    private readonly getEventsUseCase: GetEventsUseCase,
    private readonly getTransactionsUseCase: GetTransactionsUseCase
  ) {}

  async processEvents(nEvents: number) {
    const events = await this.getEventsUseCase.getNotProcessedEvents(nEvents);

    const eventsIndexedByTransactionId = indexArrayOfObject(events, 'transactionId', false);

    const transactions = await this.getTransactionsUseCase.getTransactions(Object.keys(eventsIndexedByTransactionId));

    for (const transaction of transactions) {
      this.applyEventsToTransaction(eventsIndexedByTransactionId[transaction.transactionId], transaction);
    }

    await this.getEventsUseCase.processEvents(events);
    await this.getTransactionsUseCase.updateTransactions(transactions);
  }

  applyEventsToTransaction(events: Array<Event>, transaction: Transaction) {
    events.sort((a: Event, b: Event) => a.serial - b.serial).forEach((e: Event) => transaction.data.push(e));
  }
}