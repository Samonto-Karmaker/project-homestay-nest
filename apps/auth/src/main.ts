import { NestFactory } from "@nestjs/core"
import { AuthModule } from "./auth.module"
import { ValidationPipe } from "@nestjs/common"
import { Logger } from "nestjs-pino"
import { ConfigService } from "@nestjs/config"
import * as cookieParser from "cookie-parser"
import { Transport } from "@nestjs/microservices"

async function bootstrap() {
    const app = await NestFactory.create(AuthModule)
    const configService = app.get(ConfigService)

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [
                configService.get<string>(
                    "RABBITMQ_URL",
                    "amqp://rabbitmq:5672"
                ),
            ],
            queue: configService.get<string>("RABBITMQ_QUEUE", "auth"),
            queueOptions: {
                durable: true, // Ensure the queue is durable that is it will survive a broker restart
            },
            prefetchCount: 1, // Limit the number of messages sent over the channel before an ack is received
        },
    })

    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    app.useLogger(app.get(Logger))

    await app.startAllMicroservices()
    await app.listen(configService.get<number>("HTTP_PORT", 3001))
}
bootstrap()
