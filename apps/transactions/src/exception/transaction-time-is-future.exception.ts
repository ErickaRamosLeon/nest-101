export class TransactionTimeIsFutureException {
    message: string;
  
    constructor(time: Date) {
      this.message = "Bad time: " + time;
    }
  
    getMessage(): string {
      return this.message;
    }
  }