import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { UserDto } from "@app/common/dto/user.dto"

const getCurrentUserFromContext = (
    context: ExecutionContext
): UserDto | undefined => {
    if (context.getType() === "http") {
        const request = context.switchToHttp().getRequest<{ user?: UserDto }>()
        return request.user
    }

    const gqlContext = GqlExecutionContext.create(context).getContext<{
        req?: { headers?: { user?: string } }
    }>()

    const userHeader = gqlContext.req?.headers?.user

    if (userHeader) {
        try {
            return JSON.parse(userHeader) as UserDto
        } catch (error) {
            console.error("Failed to parse user header:", error)
        }
    }

    return undefined
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserDto | undefined => {
        return getCurrentUserFromContext(context)
    }
)
