import { CreateEventDto } from "../dto";
import { Event } from "../../domain";
import { v4 as uuidv4 } from 'uuid';


export class EventsMapper {
    formCreateEventDto(createEventDto: CreateEventDto): Event {
        return {
            ...createEventDto,
            id: uuidv4(),
            time: new Date(createEventDto.time),            
        }
    }


    /*formCreateEventDto(createEventDto: CreateEventDto): Event {
        const event = new Event();
        event.transactionId = createEventDto.transactionId;
        event.time = new Date(createEventDto.time);
        event.type = createEventDto.type;
        event.data = createEventDto.data;
        return event;

    }*/
}
