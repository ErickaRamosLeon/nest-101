import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transactrion.dto';
import { Transaction } from './transactions.model';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The transaction has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.'})
  createTransaction(@Body() createTransactionDto: CreateTransactionDto): Transaction {
    return null;
  }
}
