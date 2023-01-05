import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ProducerModule } from '../../producer.module'

describe('EventController', () => {
  let app: INestApplication;

  const radmonString = (length) => {
    
    return '';
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProducerModule],
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
        transactionId": "72293972-4c89-4a0b-8f5f-1691b58bcc62",
    "time": "2022-12-06T13:32:51.810Z",
    "type": "uno",
    "data": {
        "step": "aº step"
    }    
        customId: CUSTOM_ID,
        time: "2022-12-10T14:35:16.355Z"
      });       
    expect(res.statusCode).toBe(201)
    expect(res.body.customId).toBe(CUSTOM_ID)
    expect(res.body.time).toBe("2022-12-10T14:35:16.355Z")      
  });

  it('POST: /transactions with future time', async () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const res = await request(app.getHttpServer())
      .post('/transactions')
      .send({   
        customId: CUSTOM_ID,
        time: futureDate.toISOString()
      });       
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe("Bad time: "+ futureDate.toString())    
  });  */
})
