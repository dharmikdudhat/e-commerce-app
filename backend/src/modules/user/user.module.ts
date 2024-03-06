/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../Entities/user.entity';
import { EmailModule } from 'src/mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/auth.constants';
// import { AuthModule } from '../auth/auth.module';
// import { AuthModule } from '../auth/auth.module';
// import { EmailService } from 'src/mailer/mailer.service';
//import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1800s' },
  }),],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
