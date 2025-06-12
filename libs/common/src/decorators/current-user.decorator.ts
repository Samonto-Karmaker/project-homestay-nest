import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UserDto } from "@app/common/dto/user.dto"

const getCurrentUserFromContext = (
    context: ExecutionContext
): UserDto | undefined => {
    const request = context.switchToHttp().getRequest<{ user?: UserDto }>()
    return request.user
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserDto | undefined => {
        return getCurrentUserFromContext(context)
    }
)
