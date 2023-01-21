export type Transaction = {
  transactionId: string;
  flowId: string;
  customId: string;
  time: Date;
  step: string;
  status: string;        
  data: Array<object>;
  createdAt: Date;
  updatedAt: Date;
}