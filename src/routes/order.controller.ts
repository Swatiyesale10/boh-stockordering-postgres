import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrderRepository } from "../domain/adapters/order.repository";
import { OrderDetails } from "src/domain/entities/orderdetails.entity";
import { OrderDetailsModel } from "../domain/models/orderDetails.model";
import { RequestModel } from "../domain/models/request.model";
import { WinstonLoggerService } from "../infrastructure/logger/winston-logger.service";

@Controller()
export class OrderController {
    constructor(
        private OrderRepository: OrderRepository,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(OrderController.name);
    }

    @Get('/all')
    fetchOrders() {
        this.logger.info(`in fetchOrders info`);
        return this.OrderRepository.fetchOrders()
    }

    @Get('all/status')
    fetchStatus() {
        this.logger.info('in fetchStatus info');
        return this.OrderRepository.fetchStatus()
    }

    @Get('/date')
    fetchByDate(){
        this.logger.info('in fetchByDate info');
        return this.OrderRepository.fetchByDate()
    }

    @Get('/:order_id')
    fetchById(@Param('order_id') order_id: string,){
          this.logger.info(`in fetchById info #order_id ${order_id} `);
        return this.OrderRepository.fetchById(order_id)
    }

    @Put('/id/status')
    updateStatus(@Body()req:RequestModel):Promise<OrderDetailsModel> {
        this.logger.info(`in updateStatus info #RequestModel `,{requestmodel:req});
        return this.OrderRepository.updateStatus(req)
    }

    
     
    @Post('/add')
    createDetails(@Body()orderdetails:OrderDetailsModel){
        this.logger.info(`in addOrder info #OrderDetailsModel`,{orderdetails:orderdetails});
        return this.OrderRepository.addOrder(orderdetails)

    }


   
    
}