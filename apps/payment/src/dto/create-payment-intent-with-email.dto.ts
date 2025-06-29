import { CreatePaymentIntentDto } from "@app/common"
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreatePaymentIntentWithEmailDto extends CreatePaymentIntentDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}
