export class TransactionCustomIdIsInvalidException {
    message: string;
  
    constructor(customId: string) {
      this.message = "Bad custom ID: " + customId;
    }  
    getMessage(): string {      
      return this.message;
    }
  }