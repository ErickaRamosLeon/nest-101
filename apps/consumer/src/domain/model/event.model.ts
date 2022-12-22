export class Event {
  id: string;
  serial: number;
  transactionId: string;
  time: Date;
  type: string;
  data: object;
  createdAt: Date;
  processedAt: Date;
}