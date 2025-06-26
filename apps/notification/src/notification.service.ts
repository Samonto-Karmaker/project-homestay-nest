/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common"
import { NotifyEmailDto } from "./dto/notify-email.dto"
import { ConfigService } from "@nestjs/config"
import * as nodemailer from "nodemailer"

@Injectable()
export class NotificationService {
    private readonly transporter: nodemailer.Transporter

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>("EMAIL_HOST"),
            port: this.configService.get<number>("EMAIL_PORT"),
            secure: this.configService.get<boolean>("EMAIL_SECURE"), // true for 465, false for other ports
            auth: {
                user: this.configService.get<string>("EMAIL_USER"),
                pass: this.configService.get<string>("EMAIL_PASS"),
            },
        })
    }

    async notifyEmail({ email, text }: NotifyEmailDto) {
        console.log(`Sending email to ${email} with text: ${text}`)
        const mailOptions = {
            from: this.configService.get<string>("EMAIL_FROM"),
            to: email,
            subject: "Notification",
            text: text,
        }
        try {
            const info = await this.transporter.sendMail(mailOptions)
            console.log("Email sent successfully!")
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
        } catch (error) {
            console.error("Error sending email:", error)
            throw new Error("Failed to send email")
        }
    }
}
