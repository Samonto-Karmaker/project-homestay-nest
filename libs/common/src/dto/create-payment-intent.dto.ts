import {
    IsDefined,
    IsNotEmptyObject,
    IsNumber,
    ValidateNested,
} from "class-validator"
import { CardDto } from "./card.dto"
import { Type } from "class-transformer"

export class CreatePaymentIntentDto {
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto

    @IsNumber()
    amount: number
}
