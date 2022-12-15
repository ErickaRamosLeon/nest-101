import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { EventsPort } from "../ports";
import { Event } from "../model";




@Injectable()
export class EventsUseCase {
  constructor(@Inject('EventsPort') private readonly eventPort: EventsPort) {}

  async createEvent(event: Event): Promise<Event> {
    event.id = uuidv4();
    const newEvent = await this.eventPort.createEvent(event);
    return newEvent;
  }
}
