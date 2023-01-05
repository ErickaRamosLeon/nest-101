import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TransactionsModule } from './../src/transactions.module';

describe('TransactionsController', () => {
  let app: INestApplication;

  const radmonString = (length) => {
    let result       = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const CUSTOM_ID = radmonString(8);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("should GET /", () => {
    return request(app.getHttpServer())
      .get("/transactions").expect(200);
  });

  it('POST: /transactions OK', async () => {
    const res = await request(app.getHttpServer())
      .post('/transactions')
      .send({   
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
  });  
})
