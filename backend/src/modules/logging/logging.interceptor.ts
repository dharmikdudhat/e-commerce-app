/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogEntity } from '../../Entities/logging.entity';
import { User } from '../../Entities/user.entity';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { method, url, body } = request;
    //console.log(body);
    //const user: string | undefined = body.username;
    //console.log(user);

    return next.handle().pipe(
      tap(async (data) => {
        if (response.statusCode < 300) {
          const logData: DeepPartial<LogEntity> = {
            method,
            url,
            statusCode: response.statusCode,
            //created_by: user || null,
            requestBody: JSON.stringify(body),
            responseBody: JSON.stringify(data),
          };

          await this.logRepository.save(logData);
        }
      }),
      catchError((error) => {
        const logData2 = {
          method,
          url,
          //created_by: user,
          statusCode:
            error instanceof HttpException
              ? error.getStatus()
              : HttpStatus.NOT_FOUND,
          requestBody: JSON.stringify(body),
          responseBody:
            error instanceof HttpException
              ? error.getResponse()
              : 'Missing Data',
        };

        this.logRepository.save(logData2 as DeepPartial<LogEntity>);
        return throwError(error);
      }),
    );
  }
}
