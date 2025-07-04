import { Roles } from "@app/common"
import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
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

    @IsOptional()
    @IsArray()
    @IsString({ each: true, message: "Role must be a string" })
    @IsEnum(Roles, {
        each: true,
        message: `Role must be one of the following: ${Object.values(Roles).join(", ")}`,
    })
    role?: string[] // Optional, can be used to assign roles like 'admin', 'user', etc.
}
