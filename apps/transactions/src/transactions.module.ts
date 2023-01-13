import { ISCHEMA_REGISTRY, SchemaRegistryModule } from '@app/schema-registry';
import { ApicurioSchemaRegistryService } from '@app/schema-registry/apicurio-schema-registry.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from 'y/postgres';
import { TransactionsPostgresDao } from './dao/transactions.postgres.dao';
import { TransactionsController } from './transactions.controller';
import { TransactionsMapper } from './transactions.mapper';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // para el .env
    PostgresModule, 
    SchemaRegistryModule
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsService, 
    TransactionsMapper,
  { provide: 'TransactionsDao', useClass: TransactionsPostgresDao }
  //{ provide: ISCHEMA_REGISTRY, useClass: ApicurioSchemaRegistryService }  
  ],
})
export class TransactionsModule {}
