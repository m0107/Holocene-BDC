import { IError } from '../types';

export default class ResponseError extends Error {
  code = 500;
  errors: IError[];
  data = undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(code: number, errors: string | IError[], data?: any) {
    super('failed');
    this.code = code;
    this.data = data;
    console.error('Error in Response Error', errors);
    if (typeof errors === 'string') {
      errors = [
        {
          message: errors,
          code: 0,
        },
      ];
    }
    this.errors = errors;
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    }
  }
}
