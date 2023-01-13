import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionsMapper {

  fromCreateTransactionDto(createTransactionDto: CreateTransactionDto): Transaction {
    return {
      ...createTransactionDto,
      transactionId: ''
    };
  }
}
