import { EventType } from "./event-type.model";

export class Event {
  id: string;
  serial: number;
  transactionId: string;
  time: Date;
  type: EventType;
  data: object;
  createdAt: Date;
  processedAt: Date;
}