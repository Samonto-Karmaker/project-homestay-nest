import { Module } from "@nestjs/common"
import { ReservationsService } from "./reservations.service"
import { ReservationsController } from "./reservations.controller"
import {
    AUTH_PACKAGE_NAME,
    AUTH_SERVICE_NAME,
    DbModule,
    HealthModule,
    LoggerModule,
    PAYMENT_PACKAGE_NAME,
    PAYMENT_SERVICE_NAME,
} from "@app/common"
import { ReservationsRepository } from "./reservations.repository"
import { Reservation, ReservationsSchema } from "./entities/reservation.entity"
import { ConfigModule, ConfigService } from "@nestjs/config"
import * as Joi from "joi"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { join } from "path"

@Module({
    imports: [
        DbModule,
        DbModule.forFeature([
            { name: Reservation.name, schema: ReservationsSchema },
        ]),
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "apps/reservations/.env",
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                HTTP_PORT: Joi.number().default(3000), // Default port
                AUTH_HOST: Joi.string().default("localhost"),
                AUTH_PORT: Joi.number().default(3002),
                PAYMENT_HOST: Joi.string().default("localhost"),
                PAYMENT_PORT: Joi.number().default(3003),
            }),
        }),
        ClientsModule.registerAsync([
            {
                name: AUTH_SERVICE_NAME,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: AUTH_PACKAGE_NAME,
                        protoPath: join(__dirname, "../../../proto/auth.proto"),
                        url:
                            configService.getOrThrow<string>("AUTH_GRPC_HOST") +
                            ":" +
                            configService.getOrThrow<number>("AUTH_GRPC_PORT"),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        ClientsModule.registerAsync([
            {
                name: PAYMENT_SERVICE_NAME,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: PAYMENT_PACKAGE_NAME,
                        protoPath: join(
                            __dirname,
                            "../../../proto/payment.proto"
                        ),
                        url:
                            configService.getOrThrow<string>(
                                "PAYMENT_GRPC_HOST"
                            ) +
                            ":" +
                            configService.getOrThrow<number>(
                                "PAYMENT_GRPC_PORT"
                            ),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        HealthModule,
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
