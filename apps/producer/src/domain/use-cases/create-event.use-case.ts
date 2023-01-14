import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { EventsPort } from "../ports";
import { Event } from "../model";
import { IJSON_SCHEMA, ISCHEMA_REGISTRY, SchemaRegistryService, JsonSchemaService } from '@app/schema-registry'
import { EventDataIsNotValidException, EventTypeIsNotValidException } from "../exception";



@Injectable()
export class EventsUseCase {
  constructor(
    @Inject('EventsPort') private readonly eventPort: EventsPort,
    @Inject(ISCHEMA_REGISTRY) private readonly schemaRegistryService: SchemaRegistryService,
    @Inject(IJSON_SCHEMA) private readonly jsonSchemaService: JsonSchemaService
  ) {}

  async createEvent(event: Event): Promise<Event> {

    const schema = await this.schemaRegistryService.getSchema(event.type);
    console.log('schema event', schema)    
    if (!schema) {
      throw new EventTypeIsNotValidException(event.type);
    }

    console.log('schema event', event.data)  

    const valid = this.jsonSchemaService.validate(schema, event.data);

    if (!valid) {
      throw new EventDataIsNotValidException();
    }

    event.id = uuidv4();

    const newEvent = await this.eventPort.createEvent(event);
    return newEvent;
  }
}
