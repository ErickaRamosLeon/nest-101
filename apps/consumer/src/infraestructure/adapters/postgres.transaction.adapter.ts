import { Injectable } from '@nestjs/common';
import { PostgresService } from '@libs/postgres'
import { TransactionsPort, Transaction } from '../../domain';

const rowList = '"id", "custom_id", "flow_id", "time", "timeline", "status", "created_at", "updated_at", "current_step", "steps"';

const rowToTransaction = (row): Transaction => {
  return {
    transactionId: row.id,
    flowId: row.flow_id,
    customId: row.custom_id,
    time: row.time.toISOString(),
    status: JSON.parse(row.status),
    timeline: JSON.parse(row.timeline),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    currentStep: JSON.parse(row.current_step),
    steps: JSON.parse(row.steps)
  };
}
  
@Injectable()
export class PostgresTransactionsAdapter implements TransactionsPort{
  constructor(private readonly postgresService: PostgresService) {}

  async getTransactions(transactionIds: Array<string>): Promise<Transaction[]> {   
    if (transactionIds.length === 0) {
      return [];
    }   

    const result = await this.postgresService.query(
      `SELECT ${rowList} FROM "transactions" WHERE "id" IN('${transactionIds.join("','")}')`, []
    );

    //const rows_map = result.rows.map(rowToTransaction);
    const rows_map = result.rows.map(row => rowToTransaction(row));
    return rows_map
  }

  async updateTransaction(transaction: Transaction): Promise<any> {    
    return this.postgresService.query(
      `UPDATE transactions SET custom_id = $1, time = $2, timeline = $3, status = $4, current_step = $5 WHERE id = $6`,
      [
        transaction.customId,
        transaction.time, 
        JSON.stringify(transaction.timeline),
        JSON.stringify(transaction.status),
        JSON.stringify(transaction.currentStep),
        transaction.transactionId
      ]
    );
  }

  async updateTransactions(transactions: Transaction[]): Promise<any> {    
    return Promise.all(transactions.map((t) => this.updateTransaction(t)));
  }
}