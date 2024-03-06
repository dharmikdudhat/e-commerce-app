/* eslint-disable prettier/prettier */
import { /* MiddlewareConsumer */ Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities';
import { ContactEntity } from './Entities/contact.entity';
import { ProductModule } from './modules/product/product.module';
import { ProductEntity } from './Entities/product.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ImageInterceptor } from './core/GlobalInterceptor/response.interceptor';
import { AllExceptionsFilter } from './core/filters/all-exceptions.filters';
import { LogModule } from './modules/logging/log.module';
import { LogEntity } from './Entities/logging.entity';
import { LoggingInterceptor } from './modules/logging/logging.interceptor';
// import { typeOrmConfig } from './config/typrorm.config';
// import { MulterMiddleware } from './product/product.middleware';
// import { MulterModule } from '@nestjs/platform-express';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { AllModules } from './modules/modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5530,
      username: 'postgres',
      password: '55305530',
      database: 'typeorm_db',
      entities: [User, ContactEntity, ProductEntity, LogEntity],
      synchronize: true,
    }),
    AllModules,
    EmailModule,
    ConfigModule.forRoot(),
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
