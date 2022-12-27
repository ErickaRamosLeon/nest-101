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

  async getTransactions(transactionIds: Array<string>): Promise<Transaction[]> {   
    if (transactionIds.length === 0) {
      return [];
    }   
    
    const result = await this.postgresService.query(
      `SELECT ${rowList} FROM "transactions" WHERE "id" IN('${transactionIds.join("','")}')`, []
      );   
    
    const rows_map = result.rows.map(rowToTransaction);
    
    return rows_map
  }

  async updateTransaction(transaction: Transaction): Promise<any> {    
    return this.postgresService.query(
      `UPDATE transactions SET custom_id = $1, time = $2, data = $3 WHERE id = $4`,
      [transaction.customId, transaction.time.toISOString(), JSON.stringify(transaction.data), transaction.transactionId]
    );
  }

  async updateTransactions(transactions: Transaction[]): Promise<any> {    
    return Promise.all(transactions.map((t) => this.updateTransaction(t)));
  }
}