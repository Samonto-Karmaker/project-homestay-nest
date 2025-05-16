import { Logger, NotFoundException } from "@nestjs/common"
import { AbstractDocument } from "./abstract.schema"
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose"

export abstract class AbstractRepository<
    DocumentType extends AbstractDocument,
> {
    protected abstract readonly logger: Logger

    constructor(protected readonly model: Model<DocumentType>) {}

    // Create
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

    // Read individual
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

    // Read All
    async find(filter: FilterQuery<DocumentType>): Promise<DocumentType[]> {
        const documents = await this.model
            .find(filter)
            .lean<DocumentType[]>(true)
        if (!documents) {
            this.logger.error(`No documents found`)
            throw new NotFoundException(`No documents found`)
        }
        return documents
    }

    // Update
    async findOneAndUpdate(
        filter: FilterQuery<DocumentType>,
        update: UpdateQuery<DocumentType>
    ): Promise<DocumentType> {
        const document = await this.model
            .findOneAndUpdate(filter, update, {
                new: true,
            })
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

    // Delete
    async findOneAndDelete(
        filter: FilterQuery<DocumentType>
    ): Promise<DocumentType> {
        const document = await this.model
            .findOneAndDelete(filter)
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
