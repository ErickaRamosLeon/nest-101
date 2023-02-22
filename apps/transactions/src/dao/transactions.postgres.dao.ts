import { Injectable } from "@nestjs/common";
import { PostgresService } from "@libs/postgres";
import { TransactionsDao } from "./transactions.dao.interface";
import { Transaction } from "../transactions.model";

@Injectable()
export class TransactionsPostgresDao implements TransactionsDao {
    constructor( private readonly postgresService: PostgresService) {}

    async saveTransaction(transaction): Promise<Transaction> {        
        const { transactionId: id, flowId, customId, time, createdAt, updatedAt, currentStep, steps, status, timeline } = transaction;        
        await this.postgresService.query(
            `INSERT INTO "transactions" ("id", "flow_id", "custom_id", "time", "created_at", "updated_at", "current_step", "steps", "status", "timeline") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [id, flowId, customId, time, createdAt, updatedAt, currentStep, JSON.stringify(steps), status, JSON.stringify(timeline)]
        )
        return transaction
    }
}