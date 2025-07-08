import { Controller } from "@nestjs/common"
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

    /* 
        * Important Note:
        We can't use pipes in gRPC,
        because gRPC uses protobuf for serialization,
        and pipes are designed for HTTP requests.
        So we need to handle validation manually.
    */
    createPaymentIntent(
        createPaymentIntentDto: CreatePaymentIntentWithEmailDto
    ) {
        return this.paymentService.createPaymentIntent(createPaymentIntentDto)
    }
}
