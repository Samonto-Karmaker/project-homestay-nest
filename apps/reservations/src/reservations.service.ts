/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from "@nestjs/common"
import { CreateReservationDto } from "./dto/create-reservation.dto"
import { UpdateReservationDto } from "./dto/update-reservation.dto"
import { ReservationsRepository } from "./reservations.repository"
import { PAYMENT_SERVICE, UserDto } from "@app/common"
import { ClientProxy } from "@nestjs/microservices"
import { catchError, map } from "rxjs"

@Injectable()
export class ReservationsService {
    constructor(
        private readonly reservationsRepository: ReservationsRepository,
        @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy
    ) {}

    create(
        createReservationDto: CreateReservationDto,
        { _id: userId, email }: UserDto
    ) {
        return this.paymentService
            .send("createPaymentIntent", {
                amount: createReservationDto.paymentIntent.amount,
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
                }),
                catchError(err => {
                    console.error("Error creating payment intent:", err)
                    throw new Error("Payment intent creation failed")
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
