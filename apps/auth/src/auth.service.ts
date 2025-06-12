import { Injectable } from "@nestjs/common"
import { User } from "./entities/user.entity"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { Response } from "express"

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    getHello(): string {
        return "Hello World!"
    }

    login(user: User, res: Response) {
        const tokenPayload = {
            userId: user._id.toHexString(),
        }

        const expires = new Date()
        expires.setSeconds(
            expires.getSeconds() +
                this.configService.get<number>("JWT_EXPIRATION", 3600) // Default to 1 hour if not set
        )

        const token = this.jwtService.sign(tokenPayload)

        res.cookie("Authentication", token, {
            httpOnly: true,
            expires,
        })

        return token
    }
}
