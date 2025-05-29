import { AbstractRepository } from "@app/common"
import { User } from "../entities/user.entity"
import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class UserRepository extends AbstractRepository<User> {
    protected readonly logger: Logger = new Logger(UserRepository.name)

    constructor(
        @InjectModel(User.name)
        protected readonly userModel: Model<User>
    ) {
        super(userModel)
    }
}
