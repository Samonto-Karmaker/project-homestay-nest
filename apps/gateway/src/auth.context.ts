import { UnauthorizedException } from "@nestjs/common"
import { getApp } from "./app"
import { ClientProxy } from "@nestjs/microservices"
import { AUTH_SERVICE, UserDto } from "@app/common"
import { lastValueFrom } from "rxjs"

export const authContext = async ({ req }) => {
    try {
        const authClient = getApp().get<ClientProxy>(AUTH_SERVICE)
        const user: UserDto = await lastValueFrom(
            authClient.send("authenticate", {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                Authentication: req.headers?.authentication,
            })
        )
        return { user }
    } catch (err) {
        throw new UnauthorizedException(err)
    }
}
