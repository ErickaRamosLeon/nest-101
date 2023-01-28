export class TransactionTimeIsFutureException {
    message: string;
  
    constructor(time: string) {
      this.message = "Bad time: " + time;
    }
  
    getMessage(): string {
      return this.message;
    }
  }