import { NestFactory } from "@nestjs/core"
import { NotificationModule } from "./notification.module"
import { ConfigService } from "@nestjs/config"
import { Transport } from "@nestjs/microservices"
import { Logger } from "nestjs-pino"

async function bootstrap() {
    const app = await NestFactory.create(NotificationModule)
    const configService = app.get(ConfigService)
    app.connectMicroservice({
        transport: Transport.TCP,
        options: {
            host: "0.0.0.0",
            port: configService.get<number>("PORT", 3004),
        },
    })
    app.useLogger(app.get(Logger))
    app.enableCors({
        origin: "*", // For development only! In production, specify allowed origins
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    })
    await app.startAllMicroservices()
}
bootstrap()
