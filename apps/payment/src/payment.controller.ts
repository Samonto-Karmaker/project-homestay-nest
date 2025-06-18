import { Controller } from "@nestjs/common"
import { PaymentService } from "./payment.service"
import { CreateChargeDto } from "./dto/create-charge.dto"
import { MessagePattern, Payload } from "@nestjs/microservices"

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @MessagePattern("createPaymentIntent")
    createPaymentIntent(@Payload() createChargeDto: CreateChargeDto) {
        return this.paymentService.createPaymentIntent(createChargeDto)
    }
}
