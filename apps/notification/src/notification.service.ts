import { Injectable } from "@nestjs/common"
import { NotifyEmailDto } from "./dto/notify-email.dto"

@Injectable()
export class NotificationService {
    notifyEmail({ email, text }: NotifyEmailDto) {
        // Here you would implement the logic to send an email.
        // This is just a placeholder implementation.
        console.log(`Sending email to ${email} with text: ${text}`)
    }
}
