import { Module } from "@nestjs/common"
import { NotificationController } from "./notification.controller"
import { NotificationService } from "./notification.service"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { LoggerModule } from "@app/common"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "apps/notification/.env",
            validationSchema: Joi.object({
                PORT: Joi.number().default(3004), // Default port for notification service
                EMAIL_HOST: Joi.string().required(),
                EMAIL_PORT: Joi.number().default(587),
                EMAIL_USER: Joi.string().required(),
                EMAIL_PASS: Joi.string().required(),
                EMAIL_FROM: Joi.string().required(),
            }),
        }),
        LoggerModule,
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
