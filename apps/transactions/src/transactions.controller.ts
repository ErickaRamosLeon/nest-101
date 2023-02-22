import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { 
  TransactionDoesntComplySchemaException,  
  TransactionSchemaNotFoundException 
} from './exception';
import { TransactionsMapper } from './transactions.mapper';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly transactionsMapper: TransactionsMapper
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The transaction has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.'})
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    try{      
      const transaction = this.transactionsMapper.fromCreateTransactionDto(createTransactionDto); 
      const createdTransaction = await this.transactionsService.createTransaction(transaction);      
      return { "transactionId" : `${createdTransaction.transactionId}`};     

    } catch (error) {     

      if (error instanceof TransactionDoesntComplySchemaException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof TransactionSchemaNotFoundException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);      
    }
  }
}
