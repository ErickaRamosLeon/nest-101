import { Inject, Injectable } from "@nestjs/common";
import { EventsPort, EVENT_PORT } from "../ports";
import { Event } from "../model";

@Injectable()
export class GetEventsUseCase {
    constructor(@Inject(EVENT_PORT) private readonly eventsPort: EventsPort) { }

    async getNotProcessedEvents(nEvents: number): Promise<Event[]> {
      return this.eventsPort.getNotProcessedEvents(nEvents, ['serial']);
    }

    async processEvents(events: Event[]): Promise<any> {
      const processedAt = new Date();
      events.forEach((event: Event) => event.processedAt = processedAt);
      return this.eventsPort.updateEvents(events);
    }

}