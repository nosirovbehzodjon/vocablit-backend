export interface IPaginationResponseData<T> {
  total: number;
  page: number;
  items: number;
  more: boolean;
  data: T[];
}

export interface ICreateResponseData<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IUpdateResponseData<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IDeleteResponseData {
  statusCode: number;
  message: string;
}

export interface ILoginResponseData {
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
}

export interface JwtPayload {
  sub: string; // User ID
  username: string; // Username
  iat?: number; // Issued at (optional)
  exp?: number; // Expiration time (optional)
}
