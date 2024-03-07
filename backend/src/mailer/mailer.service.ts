/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';
// import { CONFIG } from "src/app.configuration";
// import { JWTService } from "../jwt/JWTService";

export type MailDetails = {
  to: string;
  subject: string;
  htmlBody: string;
};

@Injectable()
export class MailerService {
  //   constructor(private readonly jwtService: JWTService) {}

  private readonly mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    // requireTLS: true,
    auth: {
      user: 'dharmik.dudhat.ait@gmail.com',
      pass: 'pmys hggg odyk rqkt',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  private async sendEmail(mail: MailDetails) {
    // console.log(mail);

    this.mailer.sendMail({
      from: 'dharmik.dudhat.ait@gmail.com',
      to: mail.to,
      subject: mail.subject,
      html: mail.htmlBody,
    });
  }

  async sendRegistrationSuccessfulEmail(to, username, password, color) {
    // console.log(to);

    // const jwtToken = await this.jwtService.signJwt({ email: to })

    const htmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Company</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
            }
    
            .header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
    
            .content {
                padding: 20px;
            }
    
            .footer {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Our Company Website!</h1>
            </div>
            <div class="content">
                <p>Dear ${username},
    
                <p>Thank you for registering with Our Company. We are excited to have such a good customer!</p>
    
                <p>Your account details:</p>
                <ul>
                    <li><strong>Username : </strong> ${username}</li>
                    <li><strong>Password : </strong> ${password}</li>
                    <li><strong>Your Favorite Color : </strong> ${color}</li>
                </ul>
    
                <p>We look forward to serving you and providing you with a great experience. If you have any questions or need assistance, feel free to reach out to our support team.</p>
    
                <p>Best regards,<br> Our company </p>
            </div>
            <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
            </div>
        </div>
    </body>
    
    </html>
    `;

    await this.sendEmail({
      to: to,
      subject: 'User Activation',
      htmlBody: htmlBody,
    });
  }

  async sendResetPasswordEmail(email, resetToken) {
    const htmlBody = `<p>You requested a password reset, click <a href="http://localhost:5173/user/resetpassword/${resetToken}">here</a> to reset your password.</p>`;

    await this.sendEmail({
      to: email,
      subject: 'Reset Password',
      htmlBody: htmlBody,
    });
  }
}
