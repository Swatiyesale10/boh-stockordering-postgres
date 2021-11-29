import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTrack } from 'src/domain/entities/ordertrack.entity';
import { OrderRepository } from 'src/domain/adapters/order.repository';
import { OrderDatabaseModule } from 'src/infrastructure/database/order-database.module';
import { OrderController } from './order.controller';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { WinstonLoggerModule } from 'src/infrastructure/logger/winston.logger.module';
import { StatusMaster } from 'src/domain/entities/statusmaster.entity';
import { OrderDetails } from 'src/domain/entities/orderdetails.entity';

@Module({
    imports: [
        OrderDatabaseModule,
        WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() }),
        TypeOrmModule.forFeature([StatusMaster,OrderTrack,OrderDetails]),
       
        

        
    ],
    controllers: [OrderController],
    providers: [
       OrderRepository,
       
        
        

    ],
})

export class OrderModule {
    constructor() {
        console.log('OrderModule created')
    }
};