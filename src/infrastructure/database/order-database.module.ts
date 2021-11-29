import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { OrderSettingConstants } from 'src/infrastructure/constants/order-setting';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            ConfigService
                .create()
                .ensureValues(
                    [
                        OrderSettingConstants.PRODUCTS_POSTGRES_HOST,
                        OrderSettingConstants.PRODUCTS_POSTGRES_PORT,
                        OrderSettingConstants.PRODUCTS_POSTGRES_USERNAME,
                        OrderSettingConstants.PRODUCTS_POSTGRES_PASSWORD,
                        OrderSettingConstants.PRODUCTS_POSTGRES_DATABASE,
                        OrderSettingConstants.PRODUCTS_ENTITIES_PATH,
                        OrderSettingConstants.PRODUCTS_MIGRATION_TABLE_NAME,
                        OrderSettingConstants.PRODUCTS_MIGRATIONS_FILE_PATH,
                        OrderSettingConstants.PRODUCTS_MIGRATIONS_DIRECTORY
                    ]
                )
                .getTypeOrmConfig(),
                
        )]
})
export class OrderDatabaseModule { };