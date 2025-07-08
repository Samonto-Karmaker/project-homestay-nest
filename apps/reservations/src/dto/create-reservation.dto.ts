import { CreatePaymentIntentDto } from "@app/common"
import { Type } from "class-transformer"
import {
    IsDate,
    IsDefined,
    IsNotEmptyObject,
    ValidateNested,
} from "class-validator"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreateReservationDto {
    @IsDate()
    @Type(() => Date)
    @Field()
    startDate: Date

    @IsDate()
    @Type(() => Date)
    @Field()
    endDate: Date

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreatePaymentIntentDto)
    @Field(() => CreatePaymentIntentDto)
    paymentIntent: CreatePaymentIntentDto
}
