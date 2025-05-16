import { Module } from "@nestjs/common"
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose"
import { ConfigService } from "@nestjs/config"
import { ConfigModule } from "../config/config.module"

@Module({
    imports: [
        ConfigModule, // Import ConfigModule here
        MongooseModule.forRootAsync({
            imports: [ConfigModule], // Ensure ConfigModule is imported here as well
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>("MONGODB_URI"),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DbModule {
    static forFeature(models: ModelDefinition[]) {
        return MongooseModule.forFeature(models)
    }
}
