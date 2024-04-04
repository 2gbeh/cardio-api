export interface IModel {
  id: string;
  brand_id: string;
  model: string;
  created_at: string;
};

export enum EModelsServiceError {
  BRAND_ID_NOT_FOUND = 'ModelsServiceError: Brand ID Not Found',
}