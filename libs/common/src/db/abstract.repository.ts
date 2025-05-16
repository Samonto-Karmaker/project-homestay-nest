import { Logger } from "@nestjs/common"
import { AbstractDocument } from "./abstract.schema"
import { Model, Types } from "mongoose"

export abstract class AbstractRepository<
    DocumentType extends AbstractDocument,
> {
    protected abstract readonly logger: Logger

    constructor(protected readonly model: Model<DocumentType>) {}

    async create(document: Omit<DocumentType, "_id">): Promise<DocumentType> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        })
        return (await createdDocument.save()).toJSON() as DocumentType
    }
}
