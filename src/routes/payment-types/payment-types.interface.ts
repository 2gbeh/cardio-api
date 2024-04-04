export interface IPaymentType {
  id: string;
  plan_id: string;
  payment_type: string;
  amount: number;
  created_at: string;
}


export enum EPaymentTypesServiceError {
  PLAN_ID_NOT_FOUND = 'PaymentTypesServiceError: Plan ID Not Found',
}