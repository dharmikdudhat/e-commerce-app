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
// import { MulterMiddleware } from './product/product.middleware';
// import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: 'localhost',
      type: 'postgres',
      port: 5530,
      username: 'postgres',
      password: '55305530',
      database: 'typeorm_db',
      entities: [User, ContactEntity, ProductEntity],
      synchronize: true
    }),
    UserModule,
    AuthModule,
    ContactModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  /*  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MulterMiddleware).forRoutes('*');
  } */
 }
