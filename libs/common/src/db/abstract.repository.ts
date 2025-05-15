import { Logger } from "@nestjs/common"
import { AbstractDocument } from "./abstract.schema"
import { Model, Types } from "mongoose"

export abstract class AbstractRepository<T> extends AbstractDocument {
    protected abstract readonly logger: Logger

    constructor(protected readonly model: Model<T>) {
        super()
    }

    async create(document: Omit<T, "_id">): Promise<T> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        })
        return (await createdDocument.save()).toJSON() as T
    }
}
