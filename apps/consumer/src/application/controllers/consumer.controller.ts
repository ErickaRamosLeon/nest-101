import { ConsumerEventsBatchUseCase } from '../../domain';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { 
  TransactionNotFoundException, TransactionIdIsNotValidException
} from '../../domain';

@Controller('/consumer')

export class ConsumerController {
  constructor( private readonly consumerEventsBatchUseCase: ConsumerEventsBatchUseCase ) {}

  @Get('/process/:n_events') 
  async processEvents(@Param('n_events') nEvents: number): Promise<string> {    
    try{
      await this.consumerEventsBatchUseCase.processEvents(nEvents);    
      return 'ok';
    } catch (error) {
      if (error instanceof TransactionNotFoundException) {        
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      } 
      if (error instanceof TransactionIdIsNotValidException) {        
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      } 
    }
  }
}
