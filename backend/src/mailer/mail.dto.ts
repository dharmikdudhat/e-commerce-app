/* eslint-disable prettier/prettier */
// import { from } from "rxjs"

// import { Address } from "nodemailer/lib/mailer"
import { IsEmail } from "class-validator";
export class SendEmailDto {

  @IsEmail()
  email: string;
  subject?: string;
  body: string | Buffer;


}