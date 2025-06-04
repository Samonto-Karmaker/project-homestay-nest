import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { UserService } from "../user/user.service"
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            usernameField: "email",
        })
    }

    async validate(email: string, password: string) {
        try {
            return await this.userService.validateUser(email, password)
        } catch (error) {
            if (
                error instanceof UnauthorizedException ||
                error instanceof NotFoundException
            ) {
                throw error
            }
            throw new InternalServerErrorException(
                "An error occurred while validating the user. Please try again later."
            )
        }
    }
}
