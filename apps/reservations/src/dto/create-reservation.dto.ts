import { CreatePaymentIntentDto } from "@app/common/dto/create-payment-intent.dto"
import { Type } from "class-transformer"
import {
    IsDate,
    IsDefined,
    IsNotEmpty,
    IsNotEmptyObject,
    IsString,
    ValidateNested,
} from "class-validator"

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

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreatePaymentIntentDto)
    paymentIntent: CreatePaymentIntentDto
}
