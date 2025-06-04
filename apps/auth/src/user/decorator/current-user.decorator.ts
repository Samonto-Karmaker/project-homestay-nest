import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "../../entities/user.entity"

const getCurrentUserFromContext = (
    context: ExecutionContext
): User | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: User }>()
    return request.user
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): User | undefined => {
        return getCurrentUserFromContext(context)
    }
)
