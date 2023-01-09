import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { validate } from 'uuid';
import { EventsController } from './event.controller'
import { EVENT_PORT, TRANSACTION_PORT, EventsUseCase, Event, EventsPort } from '../../domain';
import { EventsMapper } from '../mapper';
import { PostgresEventAdapter } from '../../infraestructure';


describe('EventController', () => {
  let app: INestApplication;

  class MockEventPort implements EventsPort {
    async createEvent(event: Event): Promise<Event> {
      return event;
    }    
  }

  class MockEventsUseCase extends EventsUseCase {
    /*constructor() {
      super(new MockEventPort())
    }*/

    async createEvent(event: Event): Promise<Event> {
      return event;
    }
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [EventsController],
      providers: [MockEventPort, MockEventsUseCase]    
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("should GET /", () => {
    return request(app.getHttpServer())
      .get("/events").expect(404);
  });

  it('POST: /events with one client to one transaction', async () => {
    const res = await request(app.getHttpServer())
      .post('/events')
      .send({           
        "transactionId": "aabbbe9d-c0fc-4edf-a5bb-a83b7584d1d9",
        "time": "2022-12-06T13:32:51.810Z",
        "type": "uno",
        "data": {
          "step": "aº step"              
        }
      });       
    expect(res.statusCode).toBe(201)
    expect(validate(res.body.id)).toBe(true)
  });
})
