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
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>("AUTH_HOST"),
                        port: configService.get<number>("AUTH_PORT"),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        ClientsModule.registerAsync([
            {
                name: PAYMENT_SERVICE,
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.TCP,
                    options: {
                        host: configService.get<string>("PAYMENT_HOST"),
                        port: configService.get<number>("PAYMENT_PORT"),
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
