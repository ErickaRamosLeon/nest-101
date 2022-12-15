import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TransactionIdIsNotValidException } from '../../domain/exception/transaction/transaction-id-is-not-valid.exception';
import { TransactionNotFoundException } from '../../domain/exception/transaction/transaction-not-found.exception';
import { Transaction, TransactionUseCase } from '../../domain';

@Controller('/transactions')
export class TransactionsController {
  constructor(private readonly transactionUseCase: TransactionUseCase) {}

  @Get('/:transactionId')
  @ApiResponse({ status: 200, description: 'Transaction found.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.'})
  async getTransaction(@Param('transactionId') transactionId: string): Promise<Transaction> {
    try {
      return await this.transactionUseCase.getTransaction(transactionId);
    } catch(error) {
      if (error instanceof TransactionIdIsNotValidException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }

      if (error instanceof TransactionNotFoundException) {
        throw new HttpException(error.getMessage(), HttpStatus.NOT_FOUND);
      }

      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}