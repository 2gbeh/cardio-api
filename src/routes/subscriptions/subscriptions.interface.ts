export interface ISubscription {
  id: string;
  year: number;
  model_id: string;
  plan_id: string;
  payment_type_id: string;
  location_id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
}

export enum ESubscriptionsServiceError {
  MODEL_ID_NOT_FOUND = 'SubscriptionsServiceError: Model ID Not Found',
  PLAN_ID_NOT_FOUND = 'SubscriptionsServiceError: Plan ID Not Found',
  PAYMENT_TYPE_ID_NOT_FOUND = 'SubscriptionsServiceError: Payment Type ID Not Found',
  LOCATION_ID_NOT_FOUND = 'SubscriptionsServiceError: Location ID Not Found',
}
