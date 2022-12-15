import { CreateEventDto } from "../dto";
import { Event } from "../../domain";


export class EventsMapper {
    formCreateEventDto(createEventDto: CreateEventDto): Event {
        const event = new Event();
        event.transactionId = createEventDto.transactionId;
        event.time = new Date(createEventDto.time);
        event.type = createEventDto.type;
        event.data = createEventDto.data;
        return event;

    }
}