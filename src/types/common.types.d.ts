export interface IPaginationResponseData<T> {
  total: number;
  page: number;
  items: number;
  more: boolean;
  data: T[];
}

export interface ICreateResponseData<T> {
  status: number;
  message: string;
  data: T;
}

export interface IDeleteResponseData {
  status: number;
  message: string;
}
