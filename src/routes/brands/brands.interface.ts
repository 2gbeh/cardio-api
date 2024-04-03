export interface IBrand  {
  id: string;
  brand: string;
  created_at: string;
};

export type TReadArgs = string

export type TReadReturn = IBrand | IBrand[]
