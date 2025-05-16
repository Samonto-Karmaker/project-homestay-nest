import { AbstractDocument } from "@app/common"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ versionKey: false })
export class Reservation extends AbstractDocument {
    @Prop()
    startDate: Date

    @Prop()
    endDate: Date

    @Prop()
    userId: string

    @Prop()
    placeId: string

    @Prop()
    invoiceId: string

    @Prop()
    timestamp: Date
}

export const ReservationsSchema = SchemaFactory.createForClass(Reservation)
