import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Stripe from "stripe"

@Injectable()
export class PaymentService {
    private readonly stripe: Stripe

    constructor(private readonly configService: ConfigService) {
        this.stripe = new Stripe(
            this.configService.get<string>("STRIPE_SECRET_KEY") || "",
            {
                apiVersion: "2025-05-28.basil",
                typescript: true,
            }
        )
    }

    getHello(): string {
        return "Hello World!"
    }
}
