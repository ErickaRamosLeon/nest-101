export class EventDataIsNotValidException {
    message: string;
  
    constructor() {
      this.message = `Event data is not valid`;
    }
  
    getMessage(): string {
      return this.message;
    }
  }
  
