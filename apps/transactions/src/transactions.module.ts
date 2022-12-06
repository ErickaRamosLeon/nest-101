import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsMapper } from './transactions.mapper';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsMapper],
})
export class TransactionsModule {}
