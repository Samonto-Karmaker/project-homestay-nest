import { AbstractDocument } from "@app/common"
import { Schema } from "@nestjs/mongoose"

@Schema({ versionKey: false })
export class Reservation extends AbstractDocument {
    startDate: Date
    endDate: Date
    userId: string
    placeId: string
    invoiceId: string
    timestamp: Date
}
