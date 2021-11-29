import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderdetails.entity";

@Entity({
    name:'order_track'
})
export class OrderTrack{
    forEach(arg0: (re: any) => void) {
        throw new Error("Method not implemented.");
    }
    constructor(){
        console.log('Ordertrack entitiy created')
    }
   
    
    @PrimaryGeneratedColumn()
    id: number;

  
  @Column({
         name:'order_id',
         type:'character varying',
     })
    order_id:string
    
    @Column({
        name:'status_id',
        type:'integer',
    })
    status_id:number

    @Column({
        name:'insert_date',
        type:'date'
    })
    insert_date: Date

    //  @ManyToOne(()=> OrderDetails,(order: OrderDetails)=>order.OrderTrack)
    //  @JoinColumn({name:'order_id'})
    // order:OrderDetails
//     @ManyToOne(type => OrderDetails)
// orderdetails: OrderDetails;
// orderId: string;

//  @ManyToOne(type => OrderDetails)
//  @JoinColumn({name : 'order_id'})
//  orderdetail:OrderDetails;

@ManyToOne(()=>OrderDetails, order=>order.tracks, { primary: true })
@JoinColumn({ name: "order_id",referencedColumnName: "order_id" })
orderdetail:OrderDetails





}