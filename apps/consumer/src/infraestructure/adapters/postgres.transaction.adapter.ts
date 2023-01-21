import { Injectable } from '@nestjs/common';
import { PostgresService } from 'y/postgres'
import { TransactionsPort, Transaction } from '../../domain';

const rowList = '"id", "custom_id", "flow_id", "time", "data", "step", "status", "created_at", "updated_at"';

const rowToTransaction = ({id, flow_id, custom_id, time, data, step, status, created_at, updated_at}): Transaction => {  
  
  let transaction: Transaction = {
    transactionId: id,
    flowId: flow_id,
    customId: custom_id,
    time: time,
    step: step,
    status: status,
    data: JSON.parse(data),
    createdAt: created_at,
    updatedAt: updated_at,
  }
  console.log("transaction consumer", transaction) 
  return transaction;
};

@Injectable()
export class PostgresTransactionsAdapter implements TransactionsPort{
  constructor(private readonly postgresService: PostgresService) {}

  async getTransactions(transactionIds: Array<string>): Promise<Transaction[]> {   
    if (transactionIds.length === 0) {
      return [];
    }   
    console.log(rowList)
    console.log("transactionsIDS", transactionIds)
    const result = await this.postgresService.query(
      `SELECT ${rowList} FROM "transactions" WHERE "id" IN('${transactionIds.join("','")}')`, []
      );   
    

    console.log("result", result.rows)
    const rows_map = result.rows.map(rowToTransaction);    
    console.log("rows_map", rows_map)
    
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