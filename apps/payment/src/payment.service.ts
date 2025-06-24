import { Inject, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Stripe from "stripe"
import { NOTIFICATION_SERVICE } from "@app/common"
import { ClientProxy } from "@nestjs/microservices"
import { CreatePaymentIntentWithEmailDto } from "./dto/create-payment-intent-with-email.dto"

@Injectable()
export class PaymentService {
    private readonly stripe: Stripe

    constructor(
        private readonly configService: ConfigService,
        @Inject(NOTIFICATION_SERVICE)
        private readonly notificationService: ClientProxy
    ) {
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

    async createPaymentIntent({
        amount,
        email,
    }: CreatePaymentIntentWithEmailDto) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Convert to cents and rounded to avoid floating point issues
                currency: "usd",
                confirm: true,
                payment_method: "pm_card_visa", // Replace with actual card ID or method
                payment_method_types: ["card"],
            })

            this.notificationService.emit("notify-email", {
                email,
                text: `Your payment of $${amount.toFixed(2)} has been processed successfully.`,
            })

            return paymentIntent
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Unknown error"
            throw new Error(`Payment processing failed: ${message}`)
        }
    }
}
