import { Injectable } from "@nestjs/common";
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
import { WinstonLoggerService } from "../../infrastructure/logger/winston-logger.service";

 
@Injectable()
export class OrderRepository implements IOrderPort {
    constructor( @InjectRepository(OrderTrack) private orderRepository: Repository<OrderTrack> ,
                @InjectRepository(StatusMaster) private statusRepository:Repository<StatusMaster>,
                @InjectRepository(OrderDetails) private  orderDetailsRepository: Repository<OrderDetails>,
                private logger: WinstonLoggerService,) 
                {
                   this.logger.setContext(OrderRepository.name);
                }



     async fetchOrders(): Promise<OrderDetailsModel[]> 
     {
      this.logger.info(`in fetchOrders `);
       const allOrders = await this.orderDetailsRepository.find()
       this.logger.info(`in fetchOrders  info #order `,{allorder:allOrders});
       return OrderMapper.toDetails(allOrders)
    }

     async fetchStatus(): Promise<StatusModel[]> {
       
      return this.statusRepository.find()
     // return OrderMapper.toDetails(allOrders)
    }


     async fetchByDate(): Promise<OrderDetailsModel[]>
      {
         this.logger.info(`in fetchByDate info  `);
         const order =  await this.orderDetailsRepository.find({
         where:{ delivery_date: MoreThanOrEqual(new Date())},})
         this.logger.info(`in fetchByDate info #order `,{model:order});
         return OrderMapper.toDetails(order)
      }


     async fetchById(order_id:string): Promise<any>

      {
       
        this.logger.info(`in fetchById info #order_id  `,{order_id:order_id});
        
        const order= await this.orderDetailsRepository.findOne(order_id)

        this.logger.info(`in fetchById info  #order`,{fetchById:order});
        return  OrderMapper.toDetail(order)
      }

      async addOrder(details:OrderDetailsModel):Promise<OrderDetailsModel> 
      { 
        this.logger.info(`in addOrder info #OrderDetailsModel `);
        
        const od=new OrderDetails();
       
        od.order_id=details.order_id
        od.supplier_id=details.supplier_id
        od.status_id=details.status_id
        od.ordered_by=details.ordered_by
        od.accepted_by=details.accepted_by
        od.creation_date=details.creation_date
        od.cancelled_date=details.cancelled_date
        od.amf_fl=details.amf_fl
        od.amk_kl=details.amk_kl
        od.shop_id=details.shop_id
        od.allocated=details.allocated
        od.total=details.total
        od.delivery_date= new Date()
        od.accepted_date=details.accepted_date

        const ordertracklist = new Array<OrderTrack>()
        const track=new OrderTrack()
       
        track.insert_date= new Date
        track.status_id=od.status_id
        ordertracklist.push(track)
        this.logger.info(`in addOrder ordertrack info #OrderTrackModel `,{track:track});
        od.tracks=ordertracklist
        
        this.logger.info(`in addOrder orderdetails info #OrderDetailsModel `,{orderdetail:od});
        return await this.orderDetailsRepository.save(od)
      }

            
      async updateStatus(req:RequestModel):Promise<OrderDetailsModel>
      { 
        
        this.logger.info(`in updateStatus info #RequestModel`,{requestmodel:req});
       
       
        const orderdetail=await this.orderDetailsRepository.findOne(req.order_id)
        this.logger.info(` in updateStatus info #orderdetail `,{order:orderdetail});
        orderdetail.status_id=req.status_id
      
       
        const ordertrack= new OrderTrack();
        ordertrack.insert_date=new Date()
        ordertrack.status_id=req.status_id
        ordertrack.orderdetail=orderdetail
        this.logger.info(` in updateStatus info #ordertrack `,{track:ordertrack});
        this.orderRepository.save(ordertrack)
        return this.orderDetailsRepository.save(orderdetail)

       
      }



    



   


}
