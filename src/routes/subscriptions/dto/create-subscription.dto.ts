export class CreateSubscriptionDto {
  year: number;
  model_id: string;
  plan_id: string;
  payment_type_id: string;
  location_id: string;

  name: string;
  email: string;
  phone?: string;
}
