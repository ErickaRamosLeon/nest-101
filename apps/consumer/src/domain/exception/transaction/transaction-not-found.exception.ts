export class TransactionNotFoundException {
  message: string;
  
  constructor(transactionId: string) {
    this.message = `Transaction with ID '${transactionId}' not found`;
  }
  
  getMessage(): string {
    return this.message;
  }
}