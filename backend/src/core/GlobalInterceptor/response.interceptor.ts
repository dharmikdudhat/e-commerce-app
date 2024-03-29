/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): any {

    return next.handle().pipe(
      map((result) => {
        result['isError'] = false;
        result['message'] = result?.message;
        result['data'] = result?.data;
        return result;
      }),
    );
  }
}
