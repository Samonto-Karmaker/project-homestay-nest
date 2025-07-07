import { NestFactory } from "@nestjs/core"
import { NotificationModule } from "./notification.module"
import { ConfigService } from "@nestjs/config"
import { Transport } from "@nestjs/microservices"
import { Logger } from "nestjs-pino"
import { NOTIFICATION_PACKAGE_NAME } from "@app/common"
import { join } from "path"

async function bootstrap() {
    const app = await NestFactory.create(NotificationModule)
    const configService = app.get(ConfigService)
    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            package: NOTIFICATION_PACKAGE_NAME,
            protoPath: join(__dirname, "../../../proto/notification.proto"),
            url: configService.getOrThrow<string>("NOTIFICATION_GRPC_URL"),
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
