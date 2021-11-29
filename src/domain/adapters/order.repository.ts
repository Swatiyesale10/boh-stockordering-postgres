import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IOrderPort } from "src/domain/adapters/order.port";
import {  MoreThanOrEqual,Repository } from "typeorm";
import { OrderTrack } from "..//../domain/entities/ordertrack.entity";
import { StatusMaster } from "../entities/statusmaster.entity";
import { StatusModel } from "../models/statusMaster.model";
import { OrderDetails } from "../entities/orderdetails.entity";
import { OrderDetailsModel } from "../models/orderDetails.model";
import { RequestModel } from "../models/request.model";
import { OrderMapper } from "../../infrastructure/mapper/order.mapper";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";

 
@Injectable()
export class OrderRepository implements IOrderPort {
    constructor(@InjectRepository(OrderTrack) private orderRepository: Repository<OrderTrack> ,
                @InjectRepository(StatusMaster) private statusRepository:Repository<StatusMaster>,
                @InjectRepository(OrderDetails) private  orderDetailsRepository: Repository<OrderDetails>,
                private logger: WinstonLoggerService,) 
                {
                   this.logger.setContext(OrderRepository.name);
                }



     async fetchOrders(): Promise<OrderDetailsModel[]> 
     {
       this.logger.info('in fetchOrders info', { key: 'value' });
       this.logger.error('in fetchOrders error', { key: 'value' });
       this.logger.debug('in fetchOrders debug', { key: 'value' });
       this.logger.warn('in fetchOrders warn');
       const allOrders = await this.orderDetailsRepository.find()
       console.log("odrderdetail####",allOrders)
       return OrderMapper.toDetails(allOrders)
    }


     async fetchByDate(): Promise<OrderDetailsModel[]>
    {
        this.logger.info('in fetchByDate info', { key: 'value' });
        this.logger.error('in fetchByDate error', { key: 'value' });
        this.logger.debug('in fetchByDate debug', { key: 'value' });
        this.logger.warn('in fetchByDate warn');
        const order =  await this.orderDetailsRepository.find({
        where:{ delivery_date: MoreThanOrEqual(new Date())},
       }) 
        return OrderMapper.toDetails(order)
    }


     async fetchById(order_id:string): Promise<any>
      {
        this.logger.info('in fetchById info', { key: 'value' });
        this.logger.error('in fetchById  error', { key: 'value' });
        this.logger.debug('in fetchById  debug', { key: 'value' });
        this.logger.warn('in fetchById  warn');
        const order= await this.orderDetailsRepository.findOne(order_id)
        console.log("Order#####",order)
        return  OrderMapper.toDetail(order)
      }
            
     async updateStatus(req:RequestModel):Promise<OrderDetailsModel>

       {
        console.log("##@@@",req)
        console.log("statusid##",req.status_id)

        let orderdetail=await this.orderDetailsRepository.findOne(req.order_id)
        orderdetail.status_id=req.status_id
       
        const ordertrack= new OrderTrack();
        ordertrack.insert_date=new Date()
        ordertrack.status_id=req.status_id
        ordertrack.orderdetail=orderdetail
        console.log("$$%%^^&&",ordertrack)
        this.orderRepository.save(ordertrack)
       return this.orderDetailsRepository.save(orderdetail)
       
      }



    async addOrder(details:OrderDetailsModel):Promise<OrderDetailsModel> {

        const od=new OrderDetails();
        console.log("orderdetailsss",details)
        od.order_id=details.order_id
        od.supplier_id=details.supplier_id
        od.status_id=details.status_id
        od.ordered_by=details.ordered_by
        od.accepted_by=details.accepted_by
        od.creation_date=details.creation_date
        od.cancelled_date=details.cancelled_date
        od.amf_fl=details.amf_fl
        od.amk_kl=details.amk_kl

        const ordertracklist = new Array<OrderTrack>()
        const track=new OrderTrack()
        track.insert_date= new Date
        track.status_id=od.status_id
        ordertracklist.push(track)
        console.log("track",track)
        od.tracks=ordertracklist
     
       console.log("orderdetails#####",od)
       return await this.orderDetailsRepository.save(od)
}

async fetchStatus(): Promise<StatusModel[]> {
 
  return this.statusRepository.find()
  //return OrderMapper.toDetails(allOrders)
}


   


}
