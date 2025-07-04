import { NestFactory } from "@nestjs/core"
import { PaymentModule } from "./payment.module"
import { ConfigService } from "@nestjs/config"
import { Transport } from "@nestjs/microservices"
import { Logger } from "nestjs-pino"

async function bootstrap() {
    const app = await NestFactory.create(PaymentModule)
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
            queue: configService.get<string>("RABBITMQ_QUEUE", "payment"),
            queueOptions: {
                durable: true, // Ensure the queue is durable that is it will survive a broker restart
            },
            prefetchCount: 1, // Limit the number of messages sent over the channel before an ack is received
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
