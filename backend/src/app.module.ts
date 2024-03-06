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
// import { typeOrmConfig } from './config/typrorm.config';
// import { MulterMiddleware } from './product/product.middleware';
// import { MulterModule } from '@nestjs/platform-express';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';

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
    TypeOrmModule.forFeature([User, LogEntity, ProductEntity, ContactEntity]),
   
    UserModule,
    AuthModule,
    LogModule,
    ContactModule,
    ProductModule,
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
