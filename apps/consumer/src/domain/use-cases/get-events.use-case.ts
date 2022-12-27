import { Inject, Injectable } from "@nestjs/common";
import { EventsPort, EVENT_PORT } from "../ports";
import { Event } from "../model";

@Injectable()
export class GetEventsUseCase {
    constructor(@Inject(EVENT_PORT) private readonly eventsPort: EventsPort) { }

    async getNotProcessedEvents(nEvents: number): Promise<Event[]> {      
      const eventsNotProcessed = await this.eventsPort.getNotProcessedEvents(nEvents, ['serial']);      
      return eventsNotProcessed
    }

    async processEvents(events: Event[]): Promise<any> {      
      const processedAt = new Date();
      events.forEach((event: Event) => event.processedAt = processedAt);
      const updateEvents = this.eventsPort.updateEvents(events)
      return updateEvents;
    }

}