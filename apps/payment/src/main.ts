import { NestFactory } from "@nestjs/core"
import { PaymentModule } from "./payment.module"
import { ConfigService } from "@nestjs/config"
import { Transport } from "@nestjs/microservices"
import { Logger } from "nestjs-pino"
import { PAYMENT_PACKAGE_NAME } from "@app/common"
import { join } from "path"

async function bootstrap() {
    const app = await NestFactory.create(PaymentModule)
    const configService = app.get(ConfigService)
    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            package: PAYMENT_PACKAGE_NAME,
            protoPath: join(__dirname, "../../../proto/payment.proto"),
            url:
                configService.getOrThrow<string>("PAYMENT_GRPC_HOST") +
                ":" +
                configService.getOrThrow<number>("PAYMENT_GRPC_PORT"),
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
