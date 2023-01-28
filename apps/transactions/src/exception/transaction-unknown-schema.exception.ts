export class TransactionUnknownSchemaException {
    message: string;

    constructor(flowId: string) {
    this.message = "Transaction unknown schema with flowId " + flowId;
    }

    getMessage(): string {
        return this.message;
    }
}