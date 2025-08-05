import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { Request, Response } from 'express';
import { PrismaClientExceptionFilter } from "./prismaException.filter";
import { HttpExceptionFilter } from "./httpException.filter";
import { ErrorCodeEnum } from "src/enums/error-codes.enum";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.error(exception)
    switch (exception) {
      case exception instanceof PrismaClientKnownRequestError:
        throw new PrismaClientExceptionFilter();

      case exception instanceof HttpException:
        throw new HttpExceptionFilter();

      default:
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({
            success: false,
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
            path: request.url,
            timestamp: new Date().toISOString(),

          });
    }
  }
}