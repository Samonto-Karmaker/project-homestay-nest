import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UserModule } from "./user/user.module"
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { LoggerModule } from "@app/common"
import * as Joi from "joi"
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Module({
    imports: [
        UserModule,
        LoggerModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "apps/auth/.env",
            validationSchema: Joi.object({
                MONGODB_URI: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION: Joi.number().default(3600), // Default to 1 hour
                HTTP_PORT: Joi.number().default(3001), // Default port
                TCP_PORT: Joi.number().default(3002), // Default TCP port
            }),
        }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: `${configService.get("JWT_EXPIRATION")}s`,
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
