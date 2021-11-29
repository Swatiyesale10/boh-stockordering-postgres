import { Optional } from "typescript-optional";
import {  OrderTrackModel } from "src/domain/models/orderTrack.model";
import { StatusModel } from "../models/statusMaster.model";
import { OrderDetails } from "../entities/orderdetails.entity";
import { RequestModel } from "../models/request.model";
import { OrderDetailsModel } from "../models/orderDetails.model";

export interface IOrderPort {
 fetchOrders(): Promise<OrderDetailsModel[]>

   //  updateStatus(req:RequestModel):Promise<OrderDetailsModel>
    
   //  addOrder(details:OrderDetailsModel) 
    
    fetchById(order_id:string): Promise<any>
     fetchByDate(): Promise<any>

}