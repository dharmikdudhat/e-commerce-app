// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Injectable, StreamableFile } from '@nestjs/common';
// import { CreateEmailServerDto } from './dto/create-email-server.dto';
// import { UpdateEmailServerDto } from './dto/update-email-server.dto';
// import { MailService } from './email-server.interface';
// import { MailerService as MailerMain } from '@nestjs-modules/mailer';
// import { createReadStream, readFileSync} from 'fs';
// import { join } from 'path';
// import * as path from 'path';
// import * as pug from 'pug';

// @Injectable()
// export class EmailServerService implements MailService{
//  constructor(private readonly mailerMain: MailerMain) {}


//  async sendMail(datamailer): Promise<void> {
//      const render = this._bodytemplete(datamailer.templete, datamailer.dataTemplete);
//     await this._processSendEmail(datamailer.to, datamailer.subject, datamailer.text, render);
//  }


//  async sendMailSandBox(email: CreateEmailServerDto): Promise<void> {
//     const templateFile = path.join(__dirname, '../../src/email-server/templete/notification.pug'); 
//     const fileImg = path.join(__dirname, '../../src/email-server/public/img/amico.png'); 
//     const socialMediaImg = path.join(__dirname, '../../src/email-server/public/img/social-media.png'); 
//     const imageData = readFileSync(fileImg).toString('base64'); 
//     const imageDataSocialMedia = readFileSync(socialMediaImg).toString('base64'); 

//     const data = {
//       title: 'My title',
//       img: imageData,
//       myDescription: 'description',
//       imgSocial: imageDataSocialMedia,
//     };

//     const render = this._bodytemplete(templateFile, data);
//     await this._processSendEmail(email.to, email.subject, email.text, render);
//  }


//  _bodytemplete(templete, data) {
//   return  pug.renderFile(templete, { data });
//  }

// /**
//  * Sends an email with the specified details.
//  *
//  * @param {string} to - The recipient of the email.
//  * @param {string} subject - The subject of the email.
//  * @param {string} text - The plain text content of the email.
//  * @param {string} body - The HTML content of the email.
//  * @return {Promise<void>} A promise that resolves when the email is sent successfully.
//  */
//  async _processSendEmail(to, subject, text, body): Promise<void> {
//    await  this.mailerMain.sendMail({
//         to: to,
//         subject: subject ,
//         text: text,
//         html: body,
//       })
//       .then(() => {
//         console.log('Email sent');
//       })
//       .catch((e) => {
//         console.log('Error sending email', e);
//       });
//   }

// }