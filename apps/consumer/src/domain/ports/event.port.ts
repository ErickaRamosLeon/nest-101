import { Event } from '../model/event.model';

export interface EventsPort {
  getNotProcessedEvents(nEvents: number, orders: string[]): Promise<Event[]>;
  updateEvents(events: Event[]): Promise<any>;
}

export const EVENT_PORT = 'EventsPort';