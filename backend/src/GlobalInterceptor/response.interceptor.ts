import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export class ImageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): any {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>;

    return next.handle().pipe(
      map((result) => {
        result['isError'] = false;
        result['message'] = result?.message;
        result['data'] = result?.data
        return result;
      }),
    );
  }
}
