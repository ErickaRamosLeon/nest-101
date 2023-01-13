export class TransactionDoesntComplySchemaException {
    message: string;
  
    constructor(schema: object) {
      this.message = "Data format doesn't comply schema";
    }
  
    getMessage(): string {
      return this.message;
    }
  }