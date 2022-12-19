import { Injectable } from "@nestjs/common";
import { PostgresService } from "y/postgres";
import { EventsPort } from "../../domain";
import { Event } from "../../domain";



@Injectable()
export class PostgresEventAdapter implements EventsPort {
  constructor(private readonly postgresService: PostgresService) {}

  async createEvent(event: Event): Promise<Event> {
    const { id, transactionId, time, type, data } = event;

    await this.postgresService.query(
      `INSERT INTO "events" ("id", "transaction_id", "time", "type", "data") VALUES ($1, $2, $3, $4, $5)`,
      [id, transactionId, time.toISOString(), type, JSON.stringify(data)]
    );

    return event;
  }
}