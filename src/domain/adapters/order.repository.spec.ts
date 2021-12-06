import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from '../entities/orderdetails.entity';
import { OrderDetailsModel } from '../models/orderDetails.model';
import { OrderTrackModel } from '../models/orderTrack.model';
import { OrderRepository } from './order.repository';
import { ConfigService } from '../../infrastructure/configuration/config.service';
import { WinstonLoggerModule } from '../../infrastructure/logger/winston.logger.module';
import { OrderTrack } from '../entities/ordertrack.entity';
import { StatusMaster } from '../entities/statusmaster.entity';


const ordertrackArray=[ new OrderTrackModel(1,'101',1,new Date())]

const ordertrackArrayt= new OrderTrackModel(1,'101',1,new Date())
const orderArray = [ new OrderDetailsModel('101',1,1,'kavya','shruti',new Date(),new Date(),1,1,1,1,1,new Date(),new Date(),ordertrackArray),]

const od  = new OrderDetailsModel('101',1,1,'kavya','shruti',new Date(), new Date(),1,1,1,1,1,new Date(), new Date(), ordertrackArray)

let date = new Date()
const odd = {
    
    order_id: "314",
    supplier_id:3,
    status_id: 4,
    ordered_by: "kavya",
    accepted_by: "shruti",
    creation_date: date ,
    cancelled_date: date,
    amf_fl: 30,
  amk_kl: 80,
  shop_id: 103,
  allocated: 10,
  total: 70,
  delivery_date: date,
  accepted_date: null,
 tracks: [ordertrackArrayt]
    

     
}
const req= {order_id:'101',status_id:1}



describe('FetchOrderService', () => {
    let repository:OrderRepository
    let repo: Repository<OrderDetails>;
   
   
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() })],
            providers: [
                OrderRepository,
                {
                    provide: getRepositoryToken(OrderDetails),
                    useValue: {
                        find: jest.fn().mockResolvedValue(orderArray),
                        findOne: jest.fn().mockResolvedValue(odd),
                        save: jest.fn().mockResolvedValue(od)
                    },
                },
                OrderRepository,
                {
                    provide: getRepositoryToken(OrderTrack),
                    useValue: {
                        save: jest.fn().mockResolvedValue(od)
                    },
                },
                OrderRepository,
                {
                    provide: getRepositoryToken(StatusMaster),
                    useValue: { },
                },
                
            ],
        }).compile();
        repository = module.get<OrderRepository>(OrderRepository);
        repo = module.get<Repository<OrderDetails>>(getRepositoryToken(OrderDetails));
     });


     it('should get a orderDetail Model', async () => {
         
            jest.spyOn(repo, 'findOne');
            const order = await repository.fetchById("314")
            console.log("orderdetails from repo",order)
            const order_repo=  JSON.stringify(order)
            console.log("orderdetails from repo",order_repo)
            const model= JSON.stringify(odd)
            expect(order_repo).toEqual(model);
    
        });


       it('should be defined', () => {
        expect(repository).toBeDefined();
        });


        describe('fetchOrders', () => {
        it('should get a order Array', async () => {
            jest.spyOn(repo, 'find');
          
            const order = await repository.fetchOrders()
            expect(order).toEqual(orderArray);
       });
        it('should get a orderDetails Array', async () => {
            jest.spyOn(repo, 'find');
           
            const order = await repository.fetchByDate()
            expect(order).toEqual(orderArray);

        });

          it('should get a orderDetail Model', async () => {
            jest.spyOn(repo, 'save');
           
            const order = await repository.updateStatus(req)
           console.log("%%%%",order)
            expect(order).toEqual(od);
    
        });

        it('should get a orderDetail Model', async () => {
         
             jest.spyOn(repo, 'save');
            
             const order = await repository.addOrder(od)
             expect(order).toEqual(od);
    
        });
 
  });



});



