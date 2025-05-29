import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { DbModule, LoggerModule } from "@app/common"
import { User, UserSchema } from "../entities/user.entity"
import { UserRepository } from "./user.repository"

@Module({
    imports: [
        DbModule,
        DbModule.forFeature([{ name: User.name, schema: UserSchema }]),
        LoggerModule,
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
