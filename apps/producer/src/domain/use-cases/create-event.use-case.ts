import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { EVENT_PORT, EventsPort } from "../ports";
import { Event } from "../model";
import { IJSON_SCHEMA, ISCHEMA_REGISTRY, SchemaRegistryService, JsonSchemaService } from '@libs/schema-registry'
import { EventDataIsNotValidException, EventTypeIsNotValidException } from "../exception";



@Injectable()
export class EventsUseCase {
  constructor(
    @Inject(EVENT_PORT) private readonly eventPort: EventsPort,
    @Inject(ISCHEMA_REGISTRY) private readonly schemaRegistryService: SchemaRegistryService,
    @Inject(IJSON_SCHEMA) private readonly jsonSchemaService: JsonSchemaService
  ) {}

  async createEvent(event: Event): Promise<Event> {
    
    event.id = uuidv4();

    const schema = await this.schemaRegistryService.getSchema(event.type);
   
    if (!schema) {      
      throw new EventTypeIsNotValidException(event.type);
    }

    const valid = this.jsonSchemaService.validate(schema, event.data);

    if (!valid) {
      throw new EventDataIsNotValidException();
    }

    const newEvent = await this.eventPort.createEvent(event);
    return newEvent;
  }
}
