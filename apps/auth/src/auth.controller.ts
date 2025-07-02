import { Controller, Post, Res, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { CurrentUser } from "@app/common/decorators/current-user.decorator"
import { User } from "./entities/user.entity"
import { Response } from "express"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    Login(
        @CurrentUser() user: User,
        @Res({ passthrough: true }) res: Response
    ) {
        return this.authService.login(user, res)
    }

    @UseGuards(JwtAuthGuard)
    @MessagePattern("authenticate")
    authenticate(@Payload() data: { user: User }) {
        return data.user
    }
}
