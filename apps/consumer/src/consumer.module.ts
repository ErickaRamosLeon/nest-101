import { Module } from '@nestjs/common';
import { PostgresModule } from '@libs/postgres';
import { ConsumerController } from './application';
import { PostgresTransactionsAdapter, PostgresEventAdapter } from './infraestructure';

import { EVENT_PORT, TRANSACTION_PORT, ConsumerEventsBatchUseCase,
  TRANSACTION_EVENT_APPLIER_PORT,
  GetEventsUseCase, GetTransactionsUseCase 
} from './domain';
import { TransactionEventApplierReducerAdapter } from "./infraestructure";
import { ScheduleModule } from '@nestjs/schedule';
import { SchemaRegistryModule } from '@libs/schema-registry';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PostgresModule,
    SchemaRegistryModule
  ],
  controllers: [ConsumerController],
  providers: [
    ConsumerEventsBatchUseCase,
    GetEventsUseCase,
    GetTransactionsUseCase,    
    { provide: TRANSACTION_PORT, useClass: PostgresTransactionsAdapter} ,
    { provide: EVENT_PORT, useClass: PostgresEventAdapter } ,
    { provide: TRANSACTION_EVENT_APPLIER_PORT, useClass: TransactionEventApplierReducerAdapter },
  ],
})
export class ConsumerModule {}
