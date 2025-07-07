import {
    IsDefined,
    IsNotEmptyObject,
    IsNumber,
    ValidateNested,
} from "class-validator"
import { CardDto } from "./card.dto"
import { Type } from "class-transformer"
import { CreatePaymentIntentRequest } from "@app/common"

export class CreatePaymentIntentDto
    implements Omit<CreatePaymentIntentRequest, "email">
{
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto

    @IsNumber()
    amount: number
}
