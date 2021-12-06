
import { OrderTrackModel } from "./orderTrack.model";


export class OrderDetailsModel {
    constructor(
       
         public order_id:string,
         public supplier_id:number,
         public status_id:number,
         public ordered_by:string,
         public accepted_by:string,
         public creation_date:Date,
         public cancelled_date:Date,
         public amf_fl:number,
         public amk_kl:number,
         public shop_id:number,
         public allocated: number,
         public total: number,
         public delivery_date: Date,
         public accepted_date:Date,
         public tracks: OrderTrackModel[]

         
         

       
     ){}
    
   
     
     
     
     
}

