import { Event } from '../model/event.model';

export interface EventsPort {
  createEvent(event: Event): Promise<Event>;
}

export const EVENT_PORT = 'EventsPort';
