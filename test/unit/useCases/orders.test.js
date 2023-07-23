const { 
    order : {
        addOrderUseCase,
        getOrderByIdUseCase,
        updateOrderUseCase,
        deleteOrderUseCase
    },
    user: {
        getUserByIdUseCase,
        addUserUseCase
    },
    product: {
        getProductByIdUseCase,
        addProductUseCase
    }
} = require('../../../src/useCases');

const {
    constants: {
        userConstants: {
            genders
        }
    }
} = require('../../../src/entities');

const {
    Order,
} = require('../../../src/entities');

const Chance = require('chance');

const chance = new Chance();

const {
    v4:uuidv4
} = require('uuid');

const {cloneDeep, before} = require('lodash');

const {
    validationError
} = require('../../../src/frameworks/common');

const {
    usersRepository, 
    productsRepository} = require('../../../src/frameworks/repositories/inMemory');


describe('Order use case', () =>{

    //create a order data
    let testOrder;

    const mockOrderRepo = {
        add: jest.fn(async order => ({
            ...order,
            id:uuidv4()
        })),
        getById: jest.fn(async id => ({
            id,
            userId: uuidv4(),
            productsIds: [uuidv4(),uuidv4()],
            date: chance.date(),
            isPayed : true,
            meta:{
                Comment:'Deliver it to me ad fast as you can'
            }
        })),
        update: jest.fn(async order => order),
        delete: jest.fn(async order => order)
    }
    
    const dependencies = {
        ordersRepository: mockOrderRepo,
        usersRepository,
        productsRepository,
        useCases: {
            user: {
                getUserByIdUseCase : jest.fn(dependencies => getUserByIdUseCase(dependencies))
            },
            product: {
                getProductByIdUseCase: jest.fn(dependencies => getProductByIdUseCase(dependencies))
            }
        }
    }

    const mocks = {};
    beforeAll(async () => {
        const addProduct = addProductUseCase(dependencies).execute;
        const addUser = addUserUseCase(dependencies).execute;

        mocks.products = await Promise.all([1,2,3].map(() => addProduct({
            name: chance.name,
            description: chance.sentence(),
            images: [chance.url, chance.url],
            price: chance.natural(),
            color: chance.color(),
            meta: {
                review: chance.sentence()
            }
        })))

        mocks.users = await Promise.all([1,2,3].map(() => addUser({
            name: chance.name,
            lastName: chance.last(),
            gender: genders.NOT_SPECIFIED,
            meta: {
                hair: {
                    color: chance.color()
                }
            }
        })))

        testOrder = {
            userId: mocks.users[0].id,
            productsIds: mocks.products.map(product => product.id),
            date: chance.date(),
            isPayed : true,
            meta:{
                Comment:'Deliver it to me ad fast as you can'
            }
        };

    });

    describe('add order use case', () =>{
        test('Order shoul be added', async () =>{
            //add a order using the use case
            const addedOrder = await addOrderUseCase(dependencies).execute(testOrder);

            //check the received data
            expect(addedOrder).toBeDefined();
            expect(addedOrder.id).toBeDefined();
            expect(addedOrder.userId).toBe(testOrder.userId);
            expect(addedOrder.productsIds).toEqual(testOrder.productsIds);
            expect(addedOrder.date).toEqual(testOrder.date);
            expect(addedOrder.isPayed).toBe(testOrder.isPayed);
            expect(addedOrder.meta).toEqual(testOrder.meta);

            //check that the dependency called as expected
            const expectOrderData = mockOrderRepo.add.mock.calls[0][0];
            expect(expectOrderData).toEqual(testOrder);
        });

        test('should return validation error when product id unknown', async () => {
            const fakeId = uuidv4();
            try {
                //call add order
                await addOrderUseCase(dependencies).execute({
                    ...testOrder,
                    productsIds: [...testOrder.productsIds,fakeId]
                });
                expect(true).toBe(false);
            } catch (err) {
                expect(err.status).toBe(403);
                expect(err.validationErrors).toEqual([new validationError({field: 'productsIds', msg: `No products with ids ${fakeId}`})])
            }
        })

        test('should return error when user id unknown', async () => {
            const fakeId = uuidv4();
            try {
                //call add order
                await addOrderUseCase(dependencies).execute({
                    ...testOrder,
                    userId: fakeId
                });
                expect(true).toBe(false);
            } catch (err) {
                expect(err.status).toBe(403);
                expect(err.validationErrors).toEqual([
                    new validationError({
                        field: 'userId',
                        msg: `No user with id ${fakeId}`
                    })
                ])
            }
        })
    })

    describe('get order use case', () => {
        test('Order should be returned by id', async () => {
            //generate fake id
            const fakeId = uuidv4();
            //call get order by id
            const orderById = await getOrderByIdUseCase(dependencies).execute({
                id: fakeId
            });
            //check the data
            expect(orderById).toBeDefined();
            expect(orderById.id).toBe(fakeId);
            expect(orderById.userId).toBeDefined();
            expect(orderById.productsIds).toBeDefined();
            expect(orderById.date).toBeDefined();
            expect(orderById.isPayed).toBeDefined();
            expect(orderById.meta).toBeDefined();

            //check the mock
            const expectedId = mockOrderRepo.getById.mock.calls[0][0];
            expect(expectedId).toBe(fakeId);
        })
    })

    describe('Update order use case',  () => {
        test('Order should be updated', async () => {
            const mockOrder = {
                ...testOrder,
                id: uuidv4()
            }
            //call update order
            const updatedOrder = await updateOrderUseCase(dependencies).execute({
                order: mockOrder
            });

            //check the data
            expect(updatedOrder).toEqual(mockOrder);

            //check the result
            const expectedOrder = mockOrderRepo.update.mock.calls[0][0];

            //check the call
            expect(expectedOrder).toEqual(mockOrder);
        })
    });

    describe('Delete order use case', () => {
        test('Order should be deleted', async () => {
            const mockOrder = {
                ...testOrder,
                id: uuidv4()
            }
            
            //call delete
            const deleteOrder = await deleteOrderUseCase(dependencies).execute({
                order: cloneDeep(mockOrder)
            });

            //check the data
            expect(deleteOrder).toEqual(mockOrder);

            //check the result
            const expectedOrder = mockOrderRepo.delete.mock.calls[0][0];

            //check the call
            expect(expectedOrder).toEqual(mockOrder);
        })
    })
    
})