import { Controller } from "@nestjs/common"
import { PaymentService } from "./payment.service"
import { CreatePaymentIntentDto } from "./dto/create-payment-intent.dto"
import { MessagePattern, Payload } from "@nestjs/microservices"

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @MessagePattern("createPaymentIntent")
    createPaymentIntent(
        @Payload() createPaymentIntentDto: CreatePaymentIntentDto
    ) {
        return this.paymentService.createPaymentIntent(createPaymentIntentDto)
    }
}
