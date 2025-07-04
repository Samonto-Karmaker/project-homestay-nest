import { Module } from "@nestjs/common"
import { ReservationsService } from "./reservations.service"
import { ReservationsController } from "./reservations.controller"
import {
    AUTH_SERVICE,
    DbModule,
    HealthModule,
    LoggerModule,
    PAYMENT_SERVICE,
} from "@app/common"
import { ReservationsRepository } from "./reservations.repository"
import { Reservation, ReservationsSchema } from "./entities/reservation.entity"
import { ConfigModule, ConfigService } from "@nestjs/config"
import * as Joi from "joi"
import { ClientsModule, Transport } from "@nestjs/microservices"

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
                name: AUTH_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            configService.get<string>(
                                "RABBITMQ_URL",
                                "amqp://rabbitmq:5672"
                            ),
                        ],
                        queue: configService.get<string>(
                            "RABBITMQ_QUEUE",
                            "auth"
                        ),
                        queueOptions: {
                            durable: true, // Ensure the queue is durable that is it will survive a broker restart
                        },
                        prefetchCount: 1, // Limit the number of messages sent over the channel before an ack is received
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        ClientsModule.registerAsync([
            {
                name: PAYMENT_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [
                            configService.get<string>(
                                "RABBITMQ_URL",
                                "amqp://rabbitmq:5672"
                            ),
                        ],
                        queue: configService.get<string>(
                            "RABBITMQ_QUEUE",
                            "payment"
                        ),
                        queueOptions: {
                            durable: true, // Ensure the queue is durable that is it will survive a broker restart
                        },
                        prefetchCount: 1, // Limit the number of messages sent over the channel before an ack is received
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
