import { AbstractRepository } from "@app/common"
import { Reservation } from "./entities/reservation.entity"
import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
    protected readonly logger: Logger = new Logger(ReservationsRepository.name)

    constructor(
        @InjectModel(Reservation.name)
        protected readonly reservationModel: Model<Reservation>
    ) {
        super(reservationModel)
    }
}
