import { ArgumentsHost, Catch, HttpStatus, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Request, Response } from 'express';
import { ErrorCodeEnum } from "src/enums/error-codes.enum";
import { PrismaErrorEnum } from "src/enums/prisma-error-codes.enum";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case PrismaErrorEnum.UniqueConstraintFailed:
        let message: string;

        if (exception.meta?.target === "user_email_key")
          message = ErrorCodeEnum.EMAIL_ALREADY_EXISTS_ERROR;
        else
          message = ErrorCodeEnum.DEFAULT_ALREADY_EXISTS_ERROR;
        response
          .status(HttpStatus.CONFLICT)
          .json({
            success: false,
            statusCode: HttpStatus.CONFLICT,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,

          });
        break;
      case PrismaErrorEnum.RecordDoesNotExist:
        response
          .status(HttpStatus.NOT_FOUND)
          .json({
            success: false,
            statusCode: HttpStatus.NOT_FOUND,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: ErrorCodeEnum.DEFAULT_NOT_FOUND_ERROR,

          });
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }

}
