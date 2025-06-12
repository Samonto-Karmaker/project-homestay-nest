import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { JwtAuthGuard } from "../guards/jwt-auth.guard"
import { CurrentUser } from "./decorator/current-user.decorator"
import { User } from "../entities/user.entity"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getUser(@CurrentUser() user: User) {
        return user
    }
}
