/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/mailer/mailer.module';
import { AuthModule } from 'src/auth/auth.module';
// import { EmailService } from 'src/mailer/mailer.service';
//import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmailModule,AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
