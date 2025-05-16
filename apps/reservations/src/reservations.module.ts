import { Module } from "@nestjs/common"
import { ReservationsService } from "./reservations.service"
import { ReservationsController } from "./reservations.controller"
import { DbModule, LoggerModule } from "@app/common"
import { ReservationsRepository } from "./reservations.repository"
import { Reservation, ReservationsSchema } from "./entities/reservation.entity"

@Module({
    imports: [
        DbModule,
        DbModule.forFeature([
            { name: Reservation.name, schema: ReservationsSchema },
        ]),
        LoggerModule,
    ],
    controllers: [ReservationsController],
    providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
