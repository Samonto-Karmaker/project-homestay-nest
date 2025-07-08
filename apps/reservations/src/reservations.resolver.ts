import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Reservation } from "./entities/reservation.entity"
import { ReservationsService } from "./reservations.service"
import { CreateReservationDto } from "./dto/create-reservation.dto"
import { CurrentUser, UserDto } from "@app/common"

@Resolver(() => Reservation)
export class ReservationsResolver {
    constructor(private readonly reservationsService: ReservationsService) {}

    @Mutation(() => Reservation)
    createReservation(
        @Args("createReservationInput")
        createReservationInput: CreateReservationDto,
        @CurrentUser() user: UserDto
    ) {
        return this.reservationsService.create(createReservationInput, user)
    }

    @Query(() => [Reservation], { name: "reservations" })
    findAll() {
        return this.reservationsService.findAll()
    }

    @Query(() => Reservation, { name: "reservation" })
    findOne(@Args("id", { type: () => String }) id: string) {
        return this.reservationsService.findOne(id)
    }

    @Mutation(() => Reservation)
    updateReservation(
        @Args("id", { type: () => String }) id: string,
        @Args("updateReservationInput")
        updateReservationInput: CreateReservationDto
    ) {
        return this.reservationsService.update(id, updateReservationInput)
    }
    @Mutation(() => Reservation)
    removeReservation(@Args("id", { type: () => String }) id: string) {
        return this.reservationsService.remove(id)
    }
}
