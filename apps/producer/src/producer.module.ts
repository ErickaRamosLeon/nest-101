import { Module } from '@nestjs/common';
import { PostgresModule } from 'y/postgres';
import { EventsController, EventsMapper, TransactionsController } from './application';
import { PostgresTransactionAdapter, PostgresEventAdapter } from './infraestructure';

import { EVENT_PORT, TRANSACTION_PORT, EventsUseCase, TransactionUseCase  } from './domain';
import { SchemaRegistryModule } from '@app/schema-registry';

@Module({
  imports: [PostgresModule, SchemaRegistryModule],
  controllers: [TransactionsController, EventsController],
  providers: [
    TransactionUseCase,
    EventsMapper,
    { provide: TRANSACTION_PORT, useClass: PostgresTransactionAdapter} ,
    EventsUseCase,
    { provide: EVENT_PORT, useClass: PostgresEventAdapter } ,
  ],
})
export class ProducerModule {}
