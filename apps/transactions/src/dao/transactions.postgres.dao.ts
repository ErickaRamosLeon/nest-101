import { Injectable } from "@nestjs/common";
import { PostgresService } from "y/postgres";
import { TransactionsDao } from "../transactions.dao";
import { Transaction } from "../transactions.model";




@Injectable()
export class TransactionsPostgresDao extends TransactionsDao {
    constructor( private readonly postgresService: PostgresService) {
        super()
    }

    async allTransactions(): Promise<Transaction[]> {
        const listTransactions = await this.postgresService.query(
            `SELECT * FROM "transactions"`, [])
        return listTransactions.rows
        
    }

    async saveTransaction(transaction: Transaction): Promise<Transaction> {
        const { transactionId: id, customId, time } = transaction;
        await this.postgresService.query(
            `INSERT INTO "transactions" ("id", "custom_id", "time") VALUES ($1, $2, $3)`,
            [id, customId, time]
        )
        return transaction
    }
}