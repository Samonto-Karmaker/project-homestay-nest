import { Module } from "@nestjs/common"
import { PaymentController } from "./payment.controller"
import { PaymentService } from "./payment.service"
import * as Joi from "joi"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "apps/payment/.env",
            validationSchema: Joi.object({
                PORT: Joi.number().default(3003), // Default port
            }),
        }),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
