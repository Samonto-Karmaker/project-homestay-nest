import { Module } from "@nestjs/common"
import { ReservationsService } from "./reservations.service"
import { ReservationsController } from "./reservations.controller"
import { DbModule } from "@app/common"

@Module({
    imports: [DbModule],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule {}
