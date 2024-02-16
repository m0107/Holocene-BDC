// //src/prisma-client-exception.filter.ts

// import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
// import { BaseExceptionFilter } from '@nestjs/core';
// import { Prisma } from '@prisma/client';
// import { Response } from 'express';

// @Catch(Prisma.PrismaClientKnownRequestError)
// export class PrismaClientExceptionFilter extends BaseExceptionFilter {
//     catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
//         console.error("Mohit", exception.message);
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const message = exception.message.replace(/\n/g, '');
//         console.log("-------------exception------------");
//         console.log(exception)
//         switch (exception.code) {
//             case 'P2002': {
//                 const status = HttpStatus.CONFLICT;
//                 response.status(status).json({
//                     statusCode: status,
//                     message: message,
//                 });
//                 break;
//             }
//             default:
//                 // default 500 error code
//                 super.catch(exception, host);
//                 break;
//         }
//     }
// }

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });
    }
}