import { ISCHEMA_REGISTRY, SchemaRegistryModule } from '@libs/schema-registry';
import { ApicurioSchemaRegistryService } from '@libs/schema-registry/apicurio-schema-registry.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from '@libs/postgres';
import { TransactionsPostgresDao } from './dao/transactions.postgres.dao';
import { TransactionsController } from './transactions.controller';
import { TransactionsMapper } from './transactions.mapper';
import { TransactionsService } from './transactions.service';
import { TRANSACTION_DAO } from "./transactions.dao.interface";

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
  { provide: TRANSACTION_DAO, useClass: TransactionsPostgresDao }  
  ],
})
export class TransactionsModule {}
