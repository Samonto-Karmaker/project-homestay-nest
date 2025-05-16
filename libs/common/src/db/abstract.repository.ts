import { Logger, NotFoundException } from "@nestjs/common"
import { AbstractDocument } from "./abstract.schema"
import { FilterQuery, Model, Types } from "mongoose"

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

        // First cast to unknown to avoid type errors then cast to DocumentType
        return (
            await createdDocument.save()
        ).toJSON() as unknown as DocumentType
    }

    async findOne(filter: FilterQuery<DocumentType>): Promise<DocumentType> {
        const document = await this.model
            .findOne(filter)
            .lean<DocumentType>(true)
        if (!document) {
            this.logger.error(
                `Document not found with filter: ${JSON.stringify(filter)}`
            )
            throw new NotFoundException(
                `Document not found with filter: ${JSON.stringify(filter)}`
            )
        }
        return document
    }
}
