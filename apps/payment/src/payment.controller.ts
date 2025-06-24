import { Controller, UsePipes, ValidationPipe } from "@nestjs/common"
import { PaymentService } from "./payment.service"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { CreatePaymentIntentWithEmailDto } from "./dto/create-payment-intent-with-email.dto"

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @MessagePattern("createPaymentIntent")
    @UsePipes(new ValidationPipe())
    createPaymentIntent(
        @Payload() createPaymentIntentDto: CreatePaymentIntentWithEmailDto
    ) {
        return this.paymentService.createPaymentIntent(createPaymentIntentDto)
    }
}
