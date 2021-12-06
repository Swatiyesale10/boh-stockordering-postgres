import { Any, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { OrderTrack } from "./ordertrack.entity";


@Entity({
    name: 'order_details'
})
export class OrderDetails {
    constructor() {
        console.log('OrderDetails entity created')
    }
    @PrimaryColumn({
        name: 'order_id',
         type: 'character varying',
    })
    order_id: string;

    @Column({
        name: 'supplier_id',
        type: 'numeric',
    })
    supplier_id: number;

    @Column({
        name: 'status_id',
        type: 'integer',
    })
    status_id: number;

    @Column({
        name: 'ordered_by',
        type: 'character varying',
    })
    ordered_by: string;

    @Column({
        name: 'accepted_by',
        type: 'character varying',
    })
    accepted_by: string;

    @Column({
        name:'creation_date',
        type:'date',
    })
    creation_date: Date;

    @Column({
        name:'cancelled_date',
        type:'date'
    })
    cancelled_date: Date;

    @Column({
        name:'amf_fl',
        type:'character varying',
    })
    amf_fl: number

    @Column({
        name:'amk_kl',
        type:'character varying',
    })
    amk_kl: number

    @Column({
        name:'shop_id',
        type:'numeric',
    })
    shop_id: number

    @Column({
        name:'allocated',
        type:'numeric',
    })
    allocated: number

    @Column({
        name:'total',
        type:'numeric',
    })
    total: number

    @Column({
        name:'delivery_date',
        type:'date',
    })
    delivery_date: Date

    @Column({
        name:'accepted_date',
        type:'date',
    })
    accepted_date: Date
    
      @OneToMany(() => OrderTrack, track => track.orderdetail,{cascade:true,eager:true,})
     tracks: OrderTrack[];

     
     
        
// @OneToMany(() => OrderTrack, ordertrack => ordertrack.order_id)
//  ordertracks: OrderTrack[];


//  @OneToMany(() => OrderTrack, ordertrack=>ordertrack.order_id)
//  orderTracks:OrderTrack[]
    

   
}