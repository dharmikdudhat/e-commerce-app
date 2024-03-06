/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from '../../Entities/logging.entity';
import { LogController } from './logging.controller';
import { LoggingService } from './logging.service';
import { LoggingInterceptor } from './logging.interceptor';
import { User } from '../../Entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity, User])],
  providers: [LoggingService, LoggingInterceptor],
  controllers: [LogController],
  exports: [LoggingService, LoggingInterceptor],
})
export class LogModule {}
