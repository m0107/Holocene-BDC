import { Response } from 'express';
import { IResponseError } from '../../types';
import ResponseError from '../response_error';

export default (res: Response, err: unknown, message?: string) => {
  const error = err as ResponseError;
  console.error(message || 'RESPONSE ERROR', error);

  const sendData: IResponseError = {
    status: false,
    statusCode: 500,
    errors: [
      {
        message: 'Internal Server error',
        code: 0,
      },
    ],
    result: undefined,
  };

  if (error.code && error.code < 600) {
    sendData.statusCode = error.code;
    sendData.errors = error.errors;
    sendData.result = error.data;
  }

  return res.status(sendData.statusCode).send(sendData);
};
