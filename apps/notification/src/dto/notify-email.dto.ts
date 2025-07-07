import { NotifyEmailMessage } from "@app/common"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class NotifyEmailDto implements NotifyEmailMessage {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    text: string
}
