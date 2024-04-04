export interface IPlan {
  id: string;
  plan: string;
  cost: number;
  perks: string[];
  created_at: string;
}

export enum EPlansServiceError {
  BRAND_ID_NOT_FOUND = 'PlansServiceError: Brand ID Not Found',
  MODEL_ID_NOT_FOUND = 'PlansServiceError: Model ID Not Found',
}
