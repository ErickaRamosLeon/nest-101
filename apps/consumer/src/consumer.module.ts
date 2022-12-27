import { Module } from '@nestjs/common';
import { PostgresModule } from 'y/postgres';
import { ConsumerController } from './application';
import { PostgresTransactionsAdapter, PostgresEventAdapter } from './infraestructure';

import { EVENT_PORT, TRANSACTION_PORT, ConsumerEventsBatchUseCase  } from './domain';
import { GetEventsUseCase } from './domain/use-cases/get-events.use-case';
import { GetTransactionsUseCase } from './domain/use-cases/get-transactions.use-case';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PostgresModule
  ],
  controllers: [ConsumerController],
  providers: [
    ConsumerEventsBatchUseCase,
    GetEventsUseCase,
    GetTransactionsUseCase,    
    { provide: TRANSACTION_PORT, useClass: PostgresTransactionsAdapter} ,
    { provide: EVENT_PORT, useClass: PostgresEventAdapter } ,
  ],
})
export class ConsumerModule {}
