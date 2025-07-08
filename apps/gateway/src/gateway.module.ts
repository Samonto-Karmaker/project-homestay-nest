import { LoggerModule } from "@app/common"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: "apps/gateway/.env",
        }),
        LoggerModule,
    ],
    controllers: [],
    providers: [],
})
export class GatewayModule {}
