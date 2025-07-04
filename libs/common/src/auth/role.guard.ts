import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Observable } from "rxjs"
import { UserDto } from "../dto"
import { Request } from "express"

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            "roles",
            [context.getHandler(), context.getClass()]
        )
        if (!requiredRoles || requiredRoles.length === 0) {
            return true
        }
        const request: Request = context.switchToHttp().getRequest()
        const user = request?.user as UserDto
        if (!user || !user.role) {
            throw new ForbiddenException("No roles found for user")
        }
        const hasRole = user.role.some((role: string) =>
            requiredRoles.includes(role)
        )
        if (!hasRole) {
            throw new ForbiddenException("User does not have required roles")
        }
        return true
    }
}
