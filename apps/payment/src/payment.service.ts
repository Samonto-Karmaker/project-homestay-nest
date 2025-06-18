import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Stripe from "stripe"

@Injectable()
export class PaymentService {
    private readonly stripe: Stripe

    constructor(private readonly configService: ConfigService) {
        this.stripe = new Stripe(
            this.configService.get<string>("STRIPE_SECRET_KEY") ??
                (() => {
                    throw new Error("STRIPE_SECRET_KEY is not set")
                })(),
            {
                apiVersion: "2025-05-28.basil",
                typescript: true,
            }
        )
    }

    async createPaymentIntent(
        card: Stripe.PaymentMethodCreateParams.Card,
        amount: number
    ) {
        try {
            const paymentMethod = await this.stripe.paymentMethods.create({
                type: "card",
                card,
            })

            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Convert to cents and rounded to avoid floating point issues
                currency: "usd",
                confirm: true,
                payment_method: paymentMethod.id,
                payment_method_types: ["card"],
            })

            return paymentIntent
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Unknown error"
            throw new Error(`Payment processing failed: ${message}`)
        }
    }
}
