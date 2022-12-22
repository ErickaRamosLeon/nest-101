export class TransactionIdIsNotValidException {
  message: string;
  
  constructor(transactionId: string) {
    this.message = `Transaction ID '${transactionId}' is not valid`;
  }
  
  getMessage(): string {
    return this.message;
  }
}
