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

    async saveTransaction(transaction): Promise<Transaction> {
        console.log('tttt', transaction.createdAt)
        const { transactionId: id, flowId, customId, time, createdAt, data, updatedAt, step, status } = transaction;
        await this.postgresService.query(
            `INSERT INTO "transactions" ("id", "flow_id", "custom_id", "time", "created_at", "data", "updated_at", "step", "status") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [id, flowId, customId, time, createdAt, JSON.stringify(data), updatedAt, step, status]
        )
        return transaction
    }
}