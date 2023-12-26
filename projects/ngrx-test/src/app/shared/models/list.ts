export interface IQuery {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
}

export interface IParam {
  [param: string]: string | number | boolean | undefined | ReadonlyArray<string | number | boolean>;
}

export interface IQueryUom extends IQuery {
  page: number;
  take: number;
  order: string;
  filter: string;
  distinct_fields: string;
}

export interface IParamRegister extends IParam {
  email: string;
  password: string;
}

export interface IResponseRegister {
  access_token: string;
  refresh_token: string;
}

export interface IResponse {
  results: any[];
  page_info: IPagination;
}

export interface IPagination {
  total_results: number;
  total_pages: number;
  page: number;
  result_per_page: number;
}

export interface IResponseUom extends IResponse {
  results: Uom[];
  page_info: IPagination;
}

export interface Uom {
  id: number;
  created_at: string;
  updated_at: string;
  updated_version: number;
  created_by: string;
  updated_by?: string;
  active: boolean;
  division_id?: number;
  division_name: string;
  uom?: string;
  uom_description?: string;
}

export interface IParamUom extends IParam {
  active: boolean;
  division_id: number;
  division_name?: string;
  uom: string;
  uom_description?: string;
}