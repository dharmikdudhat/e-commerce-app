/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      host: ' localhost',
      type: 'postgres',
      port: 5530,
      username: 'postgres',
      password: '55305530',
      database: 'typeorm_db',
      entities: [User],
      synchronize: true


    }),

    UserModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
