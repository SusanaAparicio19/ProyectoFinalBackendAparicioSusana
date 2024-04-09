//Lo comentado es para conexion real

/*import nodemailer from "nodemailer"*/

//-------------------va esto
import { USER_EMAIL, USER_PASSWORD } from "../config.js"
//--------------------hasta aca
/*
const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
})*/
/*
class EmailService{
    async sendEmail(destinatario, asunto, mensaje,){
        const emailOptions = {
            from: USER_EMAIL,
            to: destinatario,
            subject: asunto,
            text: mensaje

        }

        await transport.sendMail(emailOptions)
    }
    
}*/

//------------------------------------------va desde aca
class FakeEmailService{
    async sendEmail(destinatario, asunto, mensaje,){
        const emailOptions = {
            from: USER_EMAIL,
            to: destinatario,
            subject: asunto,
            text: mensaje

        }

        console.log(JSON.stringify(emailOptions, null, 2))
    }
    
}

export class FakeEmailServicePremium{
    static async sendEmail(destinatario, asunto, mensaje,){
        const emailOptions = {
            from: USER_EMAIL,
            to: destinatario,
            subject: asunto,
            text: mensaje

        }

        console.log(JSON.stringify(emailOptions, null, 2))
    }
    
}
//-------------------------hasta aca


//export const emailService = new EmailService()

//-----------------------------va desde aca
export const emailService = new FakeEmailService()
//------------------------hasta aca