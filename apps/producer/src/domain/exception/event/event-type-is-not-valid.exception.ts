export class EventTypeIsNotValidException {
    message: string;
  
    constructor(eventType: string) {
      this.message = `Event type '${eventType}' is not valid`;
    }
  
    getMessage(): string {
      return this.message;
    }
  }