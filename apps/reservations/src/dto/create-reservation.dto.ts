import { CreatePaymentIntentDto } from "@app/common/dto/create-payment-intent.dto"
import { Type } from "class-transformer"
import {
    IsDate,
    IsDefined,
    IsNotEmptyObject,
    ValidateNested,
} from "class-validator"

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    startDate: Date

    @IsDate()
    @Type(() => Date)
    endDate: Date

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreatePaymentIntentDto)
    paymentIntent: CreatePaymentIntentDto
}
