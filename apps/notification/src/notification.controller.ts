import { Controller } from "@nestjs/common"
import { NotificationService } from "./notification.service"
import { EventPattern, Payload } from "@nestjs/microservices"
import { NotifyEmailDto } from "./dto/notify-email.dto"

@Controller()
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @EventPattern("notify-email")
    notifyEmail(@Payload() data: NotifyEmailDto) {
        return this.notificationService.notifyEmail(data)
    }
}
