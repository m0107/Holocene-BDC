/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { IError, IResponseError } from 'src/types';

export function sendSuccess(
  res: Response,
  status_code: number,
  data: any,
  message?: string
) {
  const sendData = {
    timestamp: new Date().toISOString(),
    statusCode: status_code,
    message: message || 'Successful Response',
    result: data,
  };
  return res.status(sendData.statusCode).send(sendData);
}
