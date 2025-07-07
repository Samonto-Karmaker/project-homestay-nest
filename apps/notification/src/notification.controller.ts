import { Controller } from "@nestjs/common"
import { NotificationService } from "./notification.service"
import { NotifyEmailDto } from "./dto/notify-email.dto"
import {
    NotificationServiceController,
    NotificationServiceControllerMethods,
} from "@app/common"

@Controller()
@NotificationServiceControllerMethods()
export class NotificationController implements NotificationServiceController {
    constructor(private readonly notificationService: NotificationService) {}

    notifyEmail(data: NotifyEmailDto) {
        return this.notificationService.notifyEmail(data)
    }
}
