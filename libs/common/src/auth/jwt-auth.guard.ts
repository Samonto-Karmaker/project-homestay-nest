/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    OnModuleInit,
} from "@nestjs/common"
import { catchError, Observable, of, tap, map } from "rxjs"
import { ClientGrpc } from "@nestjs/microservices"
import { AUTH_SERVICE_NAME, AuthServiceClient } from "../types"

@Injectable()
export class JwtAuthGuard implements CanActivate, OnModuleInit {
    private readonly logger = new Logger(JwtAuthGuard.name)
    private authService: AuthServiceClient

    constructor(
        @Inject(AUTH_SERVICE_NAME) private readonly authClient: ClientGrpc
    ) {}

    onModuleInit() {
        this.authService =
            this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    }

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

        return this.authService
            .authenticate({
                Authentication: jwt,
            })
            .pipe(
                tap(res => {
                    context.switchToHttp().getRequest().user = {
                        ...res,
                        _id: res.id,
                    }
                }),
                map(() => true),
                catchError(err => {
                    this.logger.error("Authentication failed", err)
                    return of(false)
                })
            )
    }
}
