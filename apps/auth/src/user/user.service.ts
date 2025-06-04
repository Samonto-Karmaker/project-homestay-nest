import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserRepository } from "./user.repository"
import { CreateUserDto } from "./dto/create-user.dto"
import { compare, hash } from "bcryptjs"

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create({
            ...createUserDto,
            password: await hash(createUserDto.password, 10),
        })
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email }) // throws NotFoundException if user not found
        const isValid = user && (await compare(password, user.password))
        if (!isValid) {
            throw new UnauthorizedException("Invalid credentials")
        }
        return user
    }
}
