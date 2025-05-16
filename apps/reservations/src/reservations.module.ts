import { Module } from "@nestjs/common"
import { ReservationsController } from "./reservations.controller"
import { ReservationsService } from "./reservations.service"
import { DbModule } from "@app/common"

@Module({
    imports: [DbModule],
    controllers: [ReservationsController],
    providers: [ReservationsService],
})
export class ReservationsModule {}
