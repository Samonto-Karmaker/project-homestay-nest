import { AbstractDocument } from "@app/common"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Field, ObjectType } from "@nestjs/graphql"

@Schema({ versionKey: false })
@ObjectType()
export class Reservation extends AbstractDocument {
    @Prop()
    @Field()
    startDate: Date

    @Prop()
    @Field()
    endDate: Date

    @Prop()
    @Field()
    userId: string

    @Prop()
    @Field()
    invoiceId: string

    @Prop()
    @Field()
    timestamp: Date
}

export const ReservationsSchema = SchemaFactory.createForClass(Reservation)
