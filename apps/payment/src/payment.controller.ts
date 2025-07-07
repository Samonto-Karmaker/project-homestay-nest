import { Controller, UsePipes, ValidationPipe } from "@nestjs/common"
import { PaymentService } from "./payment.service"
import { CreatePaymentIntentWithEmailDto } from "./dto/create-payment-intent-with-email.dto"
import {
    PaymentServiceController,
    PaymentServiceControllerMethods,
} from "@app/common"

@Controller()
@PaymentServiceControllerMethods()
export class PaymentController implements PaymentServiceController {
    constructor(private readonly paymentService: PaymentService) {}

    @UsePipes(new ValidationPipe())
    createPaymentIntent(
        createPaymentIntentDto: CreatePaymentIntentWithEmailDto
    ) {
        return this.paymentService.createPaymentIntent(createPaymentIntentDto)
    }
}
