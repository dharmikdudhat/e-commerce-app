/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { MailerService } from './mailer.service';
// import { MailerController } from './mailer.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  imports:[ConfigModule],
  controllers: [MailerController],
  providers: [EmailService],
  exports:[EmailService]
})
export class EmailModule {}
