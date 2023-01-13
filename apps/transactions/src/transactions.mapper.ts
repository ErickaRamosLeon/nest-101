import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsMapper {

  fromCreateTransactionDto(createTransactionDto: CreateTransactionDto): Transaction {
    const transaction: Transaction = new Transaction();
    transaction.customId = createTransactionDto.customId;
    transaction.flowId = createTransactionDto.flowId;
    transaction.time = createTransactionDto.time;
    return transaction;
  }
}
