/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date

    @IsDate()
    @Type(() => Date)
    endDate: Date

    @IsNotEmpty()
    @IsString()
    placeId: string

    @IsNotEmpty()
    @IsString()
    invoiceId: string
}
