/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
} from "@nestjs/common"
import { catchError, Observable, of, tap, map } from "rxjs"
import { AUTH_SERVICE } from "../constants"
import { ClientProxy } from "@nestjs/microservices"
import { UserDto } from "../dto"

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly logger = new Logger(JwtAuthGuard.name)

    constructor(
        @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy
    ) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const jwt =
            context.switchToHttp().getRequest().cookies?.Authentication ||
            context.switchToHttp().getRequest().headers?.authorization

        if (!jwt) {
            this.logger.warn("No JWT token found in request")
            return false
        }

        return this.authClient
            .send<UserDto>("authenticate", {
                Authentication: jwt,
            })
            .pipe(
                tap(res => {
                    context.switchToHttp().getRequest().user = res
                }),
                map(() => true),
                catchError(err => {
                    this.logger.error("Authentication failed", err)
                    return of(false)
                })
            )
    }
}
