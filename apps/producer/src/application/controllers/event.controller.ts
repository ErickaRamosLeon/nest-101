import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Event, EventDataIsNotValidException, EventsUseCase, EventTypeIsNotValidException } from '../../domain';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventsMapper } from '../mapper/events.mapper';



@Controller('/events')
export class EventsController {
  constructor(
    private readonly eventsUseCase: EventsUseCase,
    private readonly eventsMapper: EventsMapper,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The event has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.'})
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    try {
      const event = this.eventsMapper.formCreateEventDto(createEventDto);
      const newEvent = await this.eventsUseCase.createEvent(event);
      return newEvent;
    } catch (error) {
      if (error instanceof EventTypeIsNotValidException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof EventDataIsNotValidException) {
        throw new HttpException(error.getMessage(), HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }        
  }
}
