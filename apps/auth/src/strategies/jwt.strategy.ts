/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { UserService } from "../user/user.service"
import { Request } from "express"
import { ITokenPayload } from "../interfaces/ITokenPayload"
import { Injectable } from "@nestjs/common"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) =>
                    req?.cookies?.Authentication ||
                    req?.headers?.authentication ||
                    req?.headers?.Authorization ||
                    null,
            ]),
            ignoreExpiration: false,
            secretOrKey: (() => {
                const secret = configService.get<string>("JWT_SECRET")
                if (!secret) {
                    throw new Error(
                        "JWT_SECRET is not defined in environment variables"
                    )
                }
                return secret
            })(),
        })
    }
    async validate(payload: ITokenPayload) {
        const user = await this.userService.getUserById(payload.userId)
        return user
    }
}
