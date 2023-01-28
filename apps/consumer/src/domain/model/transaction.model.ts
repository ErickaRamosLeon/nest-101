export type Transaction = {
  transactionId: string;
  flowId: string;
  customId: string;
  time: string;
  status: object;        
  timeline: Array<object>;  
  currentStep: object;       
  createdAt: string;
  updatedAt: string;
  steps: Array<object>
}