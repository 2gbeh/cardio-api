export interface IModel {
  id: string;
  brand_id: string;
  model: string;
  created_at: string;
};

export type TReadArgs = string | { brand_id: string }

export type TReadReturn = IModel | IModel[]
