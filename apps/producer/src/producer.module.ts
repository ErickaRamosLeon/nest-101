import { Module } from '@nestjs/common';
import { PostgresModule } from '@libs/postgres';
import { EventsController, EventsMapper } from './application';
import {  PostgresEventAdapter } from './infraestructure';

import { EVENT_PORT, EventsUseCase  } from './domain';
import { SchemaRegistryModule } from '@libs/schema-registry';

@Module({
  imports: [PostgresModule, SchemaRegistryModule],
  controllers: [ EventsController],
  providers: [    
    EventsMapper,   
    EventsUseCase,
    { provide: EVENT_PORT, useClass: PostgresEventAdapter } ,
  ],
})
export class ProducerModule {}
