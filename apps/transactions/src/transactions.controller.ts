import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { 
  TransactionCustomIdIsInvalidException, 
  TransactionTimeIsFutureException, 
  TransactionDoesntComplySchemaException,
  TransactionUnknownSchemaException,
  TransactionSchemaNotFoundException 
} from './exception';
import { TransactionsMapper } from './transactions.mapper';
import { Transaction } from './transactions.model';
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
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    try{      
      const transaction = this.transactionsMapper.fromCreateTransactionDto(createTransactionDto);      
      return await this.transactionsService.createTransaction(transaction);     
    } catch (error) {     

      if (error instanceof TransactionCustomIdIsInvalidException) {        
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      } 
      if (error instanceof TransactionTimeIsFutureException) {        
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof TransactionDoesntComplySchemaException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof TransactionUnknownSchemaException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof TransactionSchemaNotFoundException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);      
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Success.' })
  @ApiResponse({ status: 400, description: 'Bad request.'})
  async getAllTransactions(): Promise<Transaction[]> {    
    return this.transactionsService.findAll();        
  }
}
