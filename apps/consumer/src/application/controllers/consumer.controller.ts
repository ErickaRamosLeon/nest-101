import { ConsumerEventsBatchUseCase } from '../../domain';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('/consumer')

export class ConsumerController {
  constructor( private readonly consumerEventsBatchUseCase: ConsumerEventsBatchUseCase ) {}

  @Get('/process/:n_events') 
  async processEvents(@Param('n_events') nEvents: number): Promise<string> {    
    await this.consumerEventsBatchUseCase.processEvents(nEvents);    
    return 'ok';
  }
  
  @Get('/process') 
  process() {        
    console.log('entra process')
    return 'listo mongolito';
  }
}
