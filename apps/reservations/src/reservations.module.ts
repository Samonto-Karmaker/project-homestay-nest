import { Module } from "@nestjs/common"
import { ReservationsService } from "./reservations.service"
import { ReservationsController } from "./reservations.controller"
import { DbModule } from "@app/common"
import { ReservationsRepository } from "./reservations.repository"
import { Reservation, ReservationsSchema } from "./entities/reservation.entity"
import { LoggerModule } from "nestjs-pino"

@Module({
    imports: [
        DbModule,
        DbModule.forFeature([
            { name: Reservation.name, schema: ReservationsSchema },
        ]),
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: "pino-pretty",
                    options: {
                        colorize: true,
                        translateTime: "SYS:standard",
                        ignore: "pid,hostname",
                        singleLine: true,
                    },
                },
            },
        }),
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
