import { Injectable } from '@nestjs/common';
import { PostgresService } from 'y/postgres'
import { TransactionsPort, Transaction } from '../../domain';

const rowList = '"id", "custom_id", "time", "data", "created_at"';

const rowToTransaction = ({id, custom_id, time, data, created_at}): Transaction => {
  const transaction = new Transaction();
    transaction.transactionId = id;
    transaction.customId = custom_id;
    transaction.time = new Date(time);
    transaction.data = JSON.parse(data);
    transaction.createdAt = new Date(created_at);
    return transaction;
};

@Injectable()
export class PostgresTransactionsAdapter implements TransactionsPort{
  constructor(private readonly postgresService: PostgresService) {}

  async getTransaction(transactionId: string): Promise<Transaction> {
    const result = await this.postgresService.query(
      `SELECT ${rowList} FROM "transactions" WHERE "id" = $1`, [transactionId]
    );

    if (result.data.rows.length === 0) {
      return null;
    }

    return rowToTransaction(result.data.rows[0]);
  }

  async getTransactions(transactionIds: Array<string>): Promise<Array<Transaction>> {
    if (transactionIds.length === 0) {
      return [];
    }

    const result = await this.postgresService.query(
      `SELECT ${rowList} FROM "transactions" WHERE "id" IN($1::int[])`, [transactionIds]
    );

    return result.data.rows.map(rowToTransaction);
  }

  async updateTransaction(transaction: Transaction): Promise<any> {
    return this.postgresService.query(
      `UPDATE transactions SET custom_id = $1, time = $2, data = $3 WHERE id = $4`,
      [transaction.customId, transaction.time.toISOString(), JSON.stringify(transaction.data), transaction.transactionId]
    );
  }

  async updateTransactions(transactions: Transaction[]): Promise<any> {
    return Promise.all(transactions.map(this.updateTransaction));
  }
}