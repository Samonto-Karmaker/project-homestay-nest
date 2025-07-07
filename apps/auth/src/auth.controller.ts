import { Controller, Post, Res, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { CurrentUser } from "@app/common/decorators/current-user.decorator"
import { User } from "./entities/user.entity"
import { Response } from "express"
import { Payload } from "@nestjs/microservices"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { AuthServiceControllerMethods } from "@app/common"

@Controller()
@AuthServiceControllerMethods()
// Not implementing AuthServiceController to avoid type conflicts.
// The gRPC method signature expects a raw Authentication object,
// but we are using guards to inject a fully hydrated User.
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

    // Even though this is a gRPC method, we use @Payload to access the user object
    // injected by JwtAuthGuard. The guard resolves the raw token to a full user.
    @UseGuards(JwtAuthGuard)
    authenticate(@Payload() data: { user: User }) {
        return {
            id: data.user._id,
            email: data.user.email,
            username: data.user.username,
            role: data.user.role,
        }
    }
}
