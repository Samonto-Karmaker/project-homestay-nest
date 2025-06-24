import { Module } from "@nestjs/common"
import { PaymentController } from "./payment.controller"
import { PaymentService } from "./payment.service"
import * as Joi from "joi"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { LoggerModule, NOTIFICATION_SERVICE } from "@app/common"
import { ClientsModule, Transport } from "@nestjs/microservices"

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
                name: NOTIFICATION_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>("NOTIFICATION_HOST"),
                        port: configService.get<number>("NOTIFICATION_PORT"),
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
