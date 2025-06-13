import { NestFactory } from "@nestjs/core"
import { PaymentModule } from "./payment.module"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
    const app = await NestFactory.create(PaymentModule)
    const configService = app.get(ConfigService)
    await app.listen(configService.get<number>("HTTP_PORT", 3003))
}
bootstrap()
