import { Injectable } from '@nestjs/common';
import { EventsPort, Event } from '../../domain'
import { PostgresService } from 'y/postgres'

@Injectable()
export class PostgresEventAdapter implements EventsPort {
  constructor(private readonly postgresService: PostgresService) {}
  
  async getNotProcessedEvents(nEvents: number, orders: Array<string>): Promise<Array<Event>> {
    const result = await this.postgresService.query(
      `SELECT "id", "serial", "transaction_id", "time", "type", "data", "created_at"
       FROM "events"
       WHERE processed_at IS NULL
       ${ orders.length === 0 ? '' : 'ORDER BY ' + orders.join(',') }
       LIMIT $1`,
      [nEvents]
    );

    return result.data.rows.map(reg => {
      const event = new Event();
      event.id = reg.id;
      event.serial = reg.serial;
      event.transactionId = reg.transaction_id;
      event.time = new Date(reg.time);
      event.type = reg.type;
      event.data = JSON.parse(reg.data);
      event.createdAt = new Date(reg.created_at);
      event.processedAt = null;
      return event;
    });
  }
  
  async updateEvent(event: Event): Promise<any> {
    return this.postgresService.query(
      `UPDATE events SET transaction_id = $1, time = $2, type = $3, data = $4, processed_at = $5 WHERE id = $6`,
      [event.transactionId, event.time.toISOString(), event.type, JSON.stringify(event.data), event.processedAt.toISOString(), event.id]
    );
  }

  async updateEvents(events: Event[]): Promise<any> {
    return Promise.all(events.map(this.updateEvent));
  }
}