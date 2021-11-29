import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrderRepository } from "src/domain/adapters/order.repository";
import { OrderDetails } from "src/domain/entities/orderdetails.entity";
import { OrderDetailsModel } from "src/domain/models/orderDetails.model";
import { RequestModel } from "src/domain/models/request.model";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";

@Controller()
export class OrderController {
    constructor(
        private OrderRepository: OrderRepository,
        private logger: WinstonLoggerService,) {
        this.logger.setContext(OrderController.name);
        console.log('orders service controller created')
    }

    @Get('/all')
    fetchOrders() {
        this.logger.info('in fetchMasterData info', { key: 'value' });
        this.logger.error('in fetchMasterData error', { key: 'value' });
        this.logger.debug('in fetchMasterData debug', { key: 'value' });
        this.logger.warn('in fetchMasterData warn');
        console.log('orders service controller fetchOrders method')
        //throw new HttpException("err string", HttpStatus.FORBIDDEN);
        console.log('orders service controller fetchOrders method')
        return this.OrderRepository.fetchOrders()
     }

 @Get('/date')
     fetchByDate(){
        this.logger.info('in fetchByDate info', { key: 'value' });
        this.logger.error('in fetchByDate error', { key: 'value' });
        this.logger.debug('in fetchByDate debug', { key: 'value' });
        this.logger.warn('in fetchByDate warn');
         return this.OrderRepository.fetchByDate()
     }

         @Get('/:order_id')
    fetchById(@Param('order_id') order_id: string,){
        this.logger.info('in fetchById info', { key: 'value' });
        this.logger.error('in fetchById  error', { key: 'value' });
        this.logger.debug('in fetchById  debug', { key: 'value' });
        this.logger.warn('in fetchById  warn');
        console.log("orderid***",order_id)
         return this.OrderRepository.fetchById(order_id)
    }




    @Put('/id/status')
    updateStatus(@Body()req:RequestModel):Promise<OrderDetailsModel> {
        console.log('products service controller create method')
        console.log()
     return this.OrderRepository.updateStatus(req)
    }

    

    




    

    
    
      
 
 
     
//     @Post('/add')
//     createDetails(@Body()orderdetails:OrderDetailsModel){
//         console.log('post')
//         console.log("odtconstroller",orderdetails)
//         return this.OrderRepository.addOrder(orderdetails)

//     }

//     @Get('all/status')
// fetchStatus() {
   
//     console.log('orders service controller fetchStatus method')
//     return this.OrderRepository.fetchStatus()
//   }
   
    
}