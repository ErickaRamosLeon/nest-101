export class TransactionSchemaNotFoundException {
    message: string;
    
    constructor(schemaName: string) {
        this.message = "Schema not found: " + schemaName;
    }
    
    getMessage(): string {
       return this.message;
    }
}