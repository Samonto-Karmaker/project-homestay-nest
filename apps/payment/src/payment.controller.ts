import { Controller, UsePipes, ValidationPipe } from "@nestjs/common"
import { PaymentService } from "./payment.service"
import { CreatePaymentIntentDto } from "@app/common/dto/create-payment-intent.dto"
import { MessagePattern, Payload } from "@nestjs/microservices"

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @MessagePattern("createPaymentIntent")
    @UsePipes(new ValidationPipe())
    createPaymentIntent(
        @Payload() createPaymentIntentDto: CreatePaymentIntentDto
    ) {
        return this.paymentService.createPaymentIntent(createPaymentIntentDto)
    }
}
