/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { Injectable } from "@nestjs/common";

import * as nodemailer from "nodemailer"
// import { CONFIG } from "src/app.configuration";
// import { JWTService } from "../jwt/JWTService";

export type MailDetails = {
    to: string,
    subject: string,
    htmlBody: string
}

@Injectable()
export class EmailService {

    //   constructor(private readonly jwtService: JWTService) {}

    private readonly mailer = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        // requireTLS: true,
        auth: {
            user: 'dharmik.dudhat.ait@gmail.com',
            pass: 'pmys hggg odyk rqkt'
        },
        tls : {
            rejectUnauthorized: false,
        }
    })

    private async sendEmail(mail: MailDetails) {
        // console.log(mail);
        
        this.mailer.sendMail({
            from: 'dharmik.dudhat.ait@gmail.com',
            to: mail.to,
            subject: mail.subject,
            html: mail.htmlBody,
        })
    }

    async sendRegistrationSuccessfulEmail(to) {
        // console.log(to);
        
        // const jwtToken = await this.jwtService.signJwt({ email: to })

        const htmlBody = `
      <p>you can login now</p>
      <p>Thank you for registering with us</p>
      <a href="http://localhost:5173/login" target="_blank">Click here to Login</a>`;
    

        await this.sendEmail({
            to: to,
            subject: "Forgot Password",
            htmlBody: htmlBody,
        })
    }

}