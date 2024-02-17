
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponseError {
  status: boolean;
  statusCode: number;
  errors?: IError[];
  result?: any;
}

export interface IError {
  message: string;
  code: number;
  data?: any;
}
