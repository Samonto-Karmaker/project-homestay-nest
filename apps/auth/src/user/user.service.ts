import { Injectable } from "@nestjs/common"
import { UserRepository } from "./user.repository"
import { CreateUserDto } from "./dto/create-user.dto"
import { hash } from "bcryptjs"

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create({
            ...createUserDto,
            password: await hash(createUserDto.password, 10),
        })
    }
}
