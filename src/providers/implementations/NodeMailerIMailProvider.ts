import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider, IMessage } from '../IMailProvider';
import smtpTransport from "nodemailer-smtp-transport";
import Mail from 'nodemailer/lib/mailer';
require('dotenv/config');




export class NodeMailerIMailProvider implements IMailProvider{
 private transporter: Mail;
 
 
 

 constructor(){
     
    const user:string = process.env.API_VALIDATION_EMAIL
    const pass:string = process.env.API_VALIDATION_PASSWD

    this.transporter = nodemailer.createTransport(smtpTransport({
        

        service: 'gmail',
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
            user,
            pass
        }

    }))
 }

 async sendMail(message: IMessage){
    
    await this.transporter.sendMail({
        to: {
            name: message.to.name,
            address: message.to.email
        },
        from:{
            name: message.from.name,
            address: message.from.email
        },
        subject: message.subject,
        html: message.body

    })
 }

}