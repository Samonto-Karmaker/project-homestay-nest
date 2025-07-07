import { Inject, Injectable, OnModuleInit } from "@nestjs/common"
import { CreateReservationDto } from "./dto/create-reservation.dto"
import { UpdateReservationDto } from "./dto/update-reservation.dto"
import { ReservationsRepository } from "./reservations.repository"
import {
    PAYMENT_SERVICE_NAME,
    PaymentServiceClient,
    UserDto,
} from "@app/common"
import { ClientGrpc } from "@nestjs/microservices"
import { map } from "rxjs"

@Injectable()
export class ReservationsService implements OnModuleInit {
    private paymentService: PaymentServiceClient

    constructor(
        private readonly reservationsRepository: ReservationsRepository,
        @Inject(PAYMENT_SERVICE_NAME)
        private readonly paymentClient: ClientGrpc
    ) {}

    onModuleInit() {
        this.paymentService =
            this.paymentClient.getService<PaymentServiceClient>(
                PAYMENT_SERVICE_NAME
            )
    }

    create(
        createReservationDto: CreateReservationDto,
        { _id: userId, email }: UserDto
    ) {
        return this.paymentService
            .createPaymentIntent({
                ...createReservationDto.paymentIntent,
                email,
            })
            .pipe(
                map(res => {
                    return this.reservationsRepository.create({
                        ...createReservationDto,
                        invoiceId: res.id,
                        userId,
                        timestamp: new Date(),
                    })
                })
            )
    }

    findAll() {
        return this.reservationsRepository.find({})
    }

    findOne(_id: string) {
        return this.reservationsRepository.findOne({ _id })
    }

    update(_id: string, updateReservationDto: UpdateReservationDto) {
        return this.reservationsRepository.findOneAndUpdate(
            { _id },
            {
                $set: {
                    ...updateReservationDto,
                },
            }
        )
    }

    remove(_id: string) {
        return this.reservationsRepository.findOneAndDelete({ _id })
    }
}
