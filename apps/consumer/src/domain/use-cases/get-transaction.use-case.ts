import { Inject, Injectable } from "@nestjs/common";
import { validate } from "uuid";
import { TransactionIdIsNotValidException } from "../exception/transaction/transaction-id-is-not-valid.exception";
import { TransactionNotFoundException } from "../exception/transaction/transaction-not-found.exception";
import { Transaction } from "../model/transaction.model";
import { TransactionsPort, TRANSACTION_PORT } from "../ports/transaction.port";



@Injectable()
export class TransactionUseCase {
    constructor(@Inject(TRANSACTION_PORT) private readonly transactionsPort: TransactionsPort) {}

    async getTransaction(transactionId: string): Promise<Transaction> {
    
      if (!validate(transactionId)) {
        throw new TransactionIdIsNotValidException(transactionId);
      }
  
      const transaction = await this.transactionsPort.getTransaction(transactionId);
  
      if (transaction === null) {
        throw new TransactionNotFoundException(transactionId);
      }
  
      return transaction;
    }
}