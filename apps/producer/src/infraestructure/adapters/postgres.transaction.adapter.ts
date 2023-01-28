import { Injectable } from "@nestjs/common";
import { PostgresService } from "@libs/postgres";
import { Transaction, TransactionsPort } from "../../domain";

@Injectable()
export class PostgresTransactionAdapter implements TransactionsPort {
    constructor( private readonly postgresService: PostgresService){}

    async getTransaction(transactionId: string): Promise<Transaction> {
        const result = await this.postgresService.query(
            `SELECT "custom_id", "time" FROM "transactions" WHERE "id" = $1 LIMIT 1`,
            [transactionId]
        )

        if(result.rows.length === 0) {
            return null;
        }

        const transaction = new Transaction();
        transaction.transactionId = transactionId;
        transaction.customId = result.rows[0].custom_id;
        transaction.time = new Date(result.rows[0].time);
        return transaction;
    }





   






}