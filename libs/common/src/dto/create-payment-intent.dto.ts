import {
    IsDefined,
    IsNotEmptyObject,
    IsNumber,
    IsOptional,
    ValidateNested,
} from "class-validator"
import { CardDto } from "./card.dto"
import { Type } from "class-transformer"
import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class CreatePaymentIntentDto {
    @IsOptional()
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto

    @IsNumber()
    @Field()
    amount: number
}
