import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from "class-validator"

export class CreateUserDto {
    @IsString({
        message: "Username must be a string",
    })
    @IsNotEmpty({
        message: "Username is required",
    })
    username: string

    @IsEmail()
    @IsNotEmpty({
        message: "Email is required",
    })
    email: string

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @IsNotEmpty({
        message: "Password is required",
    })
    password: string
}
