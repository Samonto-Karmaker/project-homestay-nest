import { INestApplication } from "@nestjs/common"

let app: INestApplication

export const setApp = (appInstance: INestApplication) => {
    if (!app) {
        app = appInstance
    }
}

export const getApp = (): INestApplication => {
    if (!app) {
        throw new Error("App instance is not set")
    }
    return app
}
