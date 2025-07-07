import { Module } from "@nestjs/common"
import { PaymentController } from "./payment.controller"
import { PaymentService } from "./payment.service"
import * as Joi from "joi"
import { ConfigModule, ConfigService } from "@nestjs/config"
import {
    LoggerModule,
    NOTIFICATION_PACKAGE_NAME,
    NOTIFICATION_SERVICE_NAME,
} from "@app/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { join } from "path"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "apps/payment/.env",
            validationSchema: Joi.object({
                STRIPE_SECRET_KEY: Joi.string().required(),
                PORT: Joi.number().default(3003), // Default port
                NOTIFICATION_HOST: Joi.string().default("localhost"),
                NOTIFICATION_PORT: Joi.number().default(3004),
            }),
        }),
        ClientsModule.registerAsync([
            {
                name: NOTIFICATION_SERVICE_NAME,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: NOTIFICATION_PACKAGE_NAME,
                        protoPath: join(
                            __dirname,
                            "../../../proto/notification.proto"
                        ),
                        url: configService.getOrThrow<string>(
                            "NOTIFICATION_GRPC_URL"
                        ),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        LoggerModule,
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
