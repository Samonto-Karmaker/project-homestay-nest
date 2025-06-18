import Stripe from "stripe"

export class CreatePaymentIntentDto {
    card: Stripe.PaymentMethodCreateParams.Card
    amount: number
}
