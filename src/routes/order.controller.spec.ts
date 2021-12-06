import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "../infrastructure/configuration/config.service";
import { WinstonLoggerModule } from "../infrastructure/logger/winston.logger.module";
import { OrderRepository } from "../domain/adapters/order.repository";
import { OrderController } from "./order.controller"



const mock =()=>({
  addOrder:jest.fn(),
  updateStatus: jest.fn(),
  fetchById: jest.fn(),
  fetchByDate: jest.fn(),
  fetchOrders:jest.fn(),
  fetchStatus: jest.fn()
}) 

describe('OrderController',() => {
  let controller: OrderController;
  let repo: OrderRepository;

 beforeEach(async ()=> {
    const module: TestingModule = await Test.createTestingModule({
      
      imports:[WinstonLoggerModule.forRoot({ level: ConfigService.create().getLogLevel() })],
      

      controllers:[OrderController],

      providers:[OrderRepository,{provide:OrderRepository, useFactory: mock}],
    }).compile()
    controller= module.get<OrderController>(OrderController);
    repo= module.get<OrderRepository>(OrderRepository)
  });

  it ('should be defined',()=>{
    expect(controller).toBeDefined()
  })

  it('should call the addorder', () => {
    const track=[]
    
        const orderdetail = {order_id:'101',
          supplier_id:1,
         status_id:1,
         ordered_by:'shruti',
          accepted_by:'kavya',
          creation_date: new Date(),
         cancelled_date: new Date(),
         amf_fl:1,
         amk_kl:1,
          shop_id:1,
         allocated: 1,
         total: 4,
         delivery_date:new Date(),
         accepted_date: new Date(),
          tracks: track};
   
        controller.createDetails(orderdetail)          
   
        expect(repo.addOrder).toHaveBeenCalled();
})
 
   it('should call the updateStatus', () => {
 
      const req= {order_id:'101',status_id:1};
      controller.updateStatus(req)
      expect(repo.updateStatus).toHaveBeenCalled();
   })

    it('should call the fetchbyid', () => {
     controller.fetchById('101');
     expect(repo.fetchById).toHaveBeenCalled();
  
    });

    it('should call the fetchbyDate', () => {
  
      controller.fetchByDate();
      expect(repo.fetchByDate).toHaveBeenCalled();
  
    });

    it('should call the fetchbyOrders', () => {
  
      controller.fetchOrders();
      expect(repo.fetchOrders).toHaveBeenCalled();
  
    });

    it('should call the fetchbyOrders', () => {

      controller.fetchStatus();
      expect(repo.fetchStatus).toHaveBeenCalled();
  
    });
  
  

})