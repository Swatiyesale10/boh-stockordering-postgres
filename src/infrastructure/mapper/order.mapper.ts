import { OrderTrack } from "../../domain/entities/ordertrack.entity"
import { OrderTrackModel } from "../../domain/models/orderTrack.model"
import { Optional } from "typescript-optional"
import { StatusModel } from "src/domain/models/statusMaster.model"
import { StatusMaster } from "src/domain/entities/statusmaster.entity"
import { OrderDatabaseModule } from "../database/order-database.module"
import { OrderDetails } from "../../domain/entities/orderdetails.entity"
import { OrderDetailsModel } from "../../domain/models/orderDetails.model"

export class OrderMapper {
    static toDomain(repoEntity: OrderTrack): Optional<OrderTrackModel> {
        if (!repoEntity) {
            return Optional.empty<OrderTrackModel>()
        }

        const orderModel: OrderTrackModel = new OrderTrackModel(
            repoEntity.id,
            repoEntity.order_id,
            repoEntity.status_id,
            repoEntity.insert_date,
            //repoEntity.orderdetail
           
           
           
        
        )

        return Optional.of(orderModel)
    }
    static toDomains(repoEntities: OrderTrack[]): OrderTrackModel[] {
        const orderModels = new Array<OrderTrackModel>()
        repoEntities.forEach(
            re => {
                const orderModel = this.toDomain(re)
                orderModels.push(orderModel.get())
            }
        )
        return orderModels;
    }



    // static toDomainstatus(repoEntity:StatusMaster): Optional<StatusModel> {

       
    //     if (!repoEntity) {
    //         return Optional.empty<StatusModel>()
    //     }

    //     const statusModel: StatusModel = new StatusModel(
    //         repoEntity.statusId,
    //         repoEntity.name,
    //         repoEntity.shortDesc
           
    //     )

    //     return Optional.of(statusModel)
    // }
    
    // static toDomainsstaus(repoEntities: StatusMaster[]): StatusModel[] {
    //     const statusModels = new Array<StatusModel>()
    //     repoEntities.forEach(
    //         re => {
    //             const statusModel = this.toDomainstatus(re)
    //             statusModels.push(statusModel.get())

    //         }
    //     )
    //     return statusModels;
    // }

    
    

    static toDetail(repoEntity: OrderDetails): Optional<OrderDetailsModel> {
        if (!repoEntity) {
            return Optional.empty<OrderDetailsModel>()
        }

        const orderDModel: OrderDetailsModel = new OrderDetailsModel(
            repoEntity.order_id,
            repoEntity.supplier_id,
            repoEntity.status_id,
            repoEntity.ordered_by,
            repoEntity.accepted_by,
            repoEntity.creation_date,
            repoEntity.cancelled_date,
            repoEntity.amf_fl,
            repoEntity.amk_kl,
            repoEntity.shop_id,
            repoEntity.allocated,
            repoEntity.total,
            repoEntity.delivery_date,
            repoEntity.accepted_date,
           repoEntity.tracks
       
        )

        return Optional.of(orderDModel)
    }
    
    static toDetails(repoEntities: OrderDetails[]): OrderDetailsModel[] {
        const orderDModels = new Array<OrderDetailsModel>()
        repoEntities.forEach(
            re => {
                const orderDModel = this.toDetail(re)
                orderDModels.push(orderDModel.get())
            }
        )
        return orderDModels;
        
    }


    
} 