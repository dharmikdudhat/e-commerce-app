/* eslint-disable prettier/prettier */
import { /* MiddlewareConsumer */ Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ContactEntity } from './contact/entities/contact.entity';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/entities/product.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ImageInterceptor } from './GlobalInterceptor/response.interceptor';
import { AllExceptionsFilter } from './filters/all-exceptions.filters';
import { LogModule } from './logging/log.module';
import { LogEntity } from './logging/entity/logging.entity';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { typeOrmConfig } from './config/typrorm.config';
// import { MulterMiddleware } from './product/product.middleware';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TypeOrmModule.forFeature([User, LogEntity, ProductEntity, ContactEntity]),
    UserModule,
    AuthModule,
    LogModule,
    ContactModule,
    ProductModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ImageInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  /*  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MulterMiddleware).forRoutes('*');
  } */
}
