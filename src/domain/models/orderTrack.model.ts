import { Timestamp } from "typeorm";
import { OrderDetails } from "../entities/orderdetails.entity";

export class OrderTrackModel {
    constructor(
       public id:number,
        public order_id:string,
         public status_id: number,
         public insert_date:Date,
      
         //public orderdetail:OrderDetails
         
         

          
          ) {
        console.log('track model created')
    }
}


