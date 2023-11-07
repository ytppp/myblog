import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const message = exception.message.replace(/\n/g, '');

    response.status(HttpStatus.OK).send({
      data: null,
      status: exception['code'],
      extra: {},
      message: message,
      success: false,
    });
  }
}
