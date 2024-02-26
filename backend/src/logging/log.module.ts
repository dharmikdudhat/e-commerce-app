/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entity/logging.entity';
import { LogController } from './logging.controller';
import { LoggingService } from './logging.service';
import { LoggingInterceptor } from './logging.interceptor';
import { User } from 'src/user/entities/user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity, User])],
  providers: [LoggingService,LoggingInterceptor],
  controllers: [LogController],
  exports: [LoggingService, LoggingInterceptor],
})
export class LogModule {}
