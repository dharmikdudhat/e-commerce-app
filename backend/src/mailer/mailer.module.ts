/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { MailerService } from './mailer.service';
// import { MailerController } from './mailer.controller';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer.service';


@Module({
  imports:[ConfigModule],
  controllers: [],
  providers: [MailerService],
  exports:[MailerService]
})
export class EmailModule {}
