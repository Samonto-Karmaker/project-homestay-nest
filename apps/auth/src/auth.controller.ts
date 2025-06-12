import { Controller, Get, Post, Res, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { CurrentUser } from "@app/common/decorators/current-user.decorator"
import { User } from "./entities/user.entity"
import { Response } from "express"

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

    @Get("/hello")
    getHello(): string {
        return this.authService.getHello()
    }
}
