import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { clearScreenDown } from 'readline';
import { Any, Repository } from 'typeorm';
import { OrderDetails } from '../entities/orderdetails.entity';
import { OrderDetailsModel } from '../models/orderDetails.model';
import { OrderTrackModel } from '../models/orderTrack.model';
import { RequestModel } from '../models/request.model';
import { OrderRepository } from './order.repository';

const ordertrackArray=[
    new OrderTrackModel(1,'101',1,new Date())
]


const orderArray = [
    new OrderDetailsModel('101',1,1,'swati','ketaki',new Date(),new Date(),'Yes','No',1,1,1,new Date(),new Date(),ordertrackArray),
    
]


describe('FetchOrderService', () => {
    let repository: OrderRepository;
    let repo: Repository<OrderDetails>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderRepository,
                {
                    provide: getRepositoryToken(OrderDetails),
                    useValue: {
                        find: jest.fn().mockResolvedValue(orderArray),
                        findOne: jest.fn().mockRejectedValue(orderArray),

                    },
                },
            ],
        }).compile();

        repository = module.get<OrderRepository>(OrderRepository);
        repo = module.get<Repository<OrderDetails>>(getRepositoryToken(OrderDetails));
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

        it('should get a orderDetails Array', async () => {
            jest.spyOn(repo, 'findOne');
            const order = await repository.updateStatus(req)
            expect(order).toEqual(orderArray);

        });
    });

   


});
