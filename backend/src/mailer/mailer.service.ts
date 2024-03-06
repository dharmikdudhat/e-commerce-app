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
        tls: {
            rejectUnauthorized: false,
        }
    })

    private async sendEmail(mail: MailDetails) {
        // console.log(mail);

        this.mailer.sendMail({
            from: 'Our Shop',
            to: mail.to,
            subject: mail.subject,
            html: mail.htmlBody,
        })
    }

    async sendRegistrationSuccessfulEmail(to, username, password, color) {
        // console.log(to);

        // const jwtToken = await this.jwtService.signJwt({ email: to })


        const htmlBody = `
        <div class="container">
        <div class="header">
            <h1>Welcome to Our Company!</h1>
        </div>
        <div class="content">
            <p>Dear ${username},

            <p>Thank you for registering with Our Company. We are excited to have you as a good customer!</p>
            <p>Enjoy your time with the company website.</p>

            <p>Your account details:</p>
            <ul>
                <li><strong>Username:</strong> ${username}</li>
                <li><strong>Password:</strong> ${password}</li>
                <li><strong>Your Favrite color:</strong> ${color}</li>
            </ul>

            <p>We look forward to serving you and providing you with a great experience. If you have any questions or need assistance, feel free to reach out to our support team.</p>

            <p>Best regards,<br> Our Shop</p>
        </div>
        <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
        </div>
        </div>
        `;


        await this.sendEmail({
            to: to,
            subject: "User Registration Successful",
            htmlBody: htmlBody,
        })
    }

}