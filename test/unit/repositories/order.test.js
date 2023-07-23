const {
    ordersRepository
} = require('../../../src/frameworks/repositories/inMemory');
const {
    Order
} = require('../../../src/entities');
const {cloneDeep} = require('lodash');
const Chance = require('chance');
const chance = new Chance();
const {
    v4:uuidv4
} = require('uuid');


describe('Orders Repository', () => {
    test('New order should be added and returned', async() =>{
        //create new order
        const testOrder = new Order({
            userId: uuidv4(),
            productsIds: [uuidv4(),uuidv4()],
            date: chance.date(),
            isPayed : true,
            meta:{
                Comment:'Deliver it to me ad fast as you can'
            }
        });

        const addedOrder = await ordersRepository.add(testOrder);

        expect(addedOrder).toBeDefined();
        expect(addedOrder.id).toBeDefined();
        expect(addedOrder.userId).toBe(testOrder.userId);
        expect(addedOrder.productsIds).toEqual(testOrder.productsIds);
        expect(addedOrder.date).toEqual(testOrder.date);
        expect(addedOrder.isPayed).toBe(testOrder.isPayed);
        expect(addedOrder.meta).toEqual(testOrder.meta);

        //get the order
        const returnedOrder = await ordersRepository.getById(addedOrder.id);
        expect(returnedOrder).toEqual(addedOrder);
    })
    test('New order should be added and returned', async() =>{
        //init two order
        const willBeDeletedOrder = new Order({
            userId: uuidv4(),
            productsIds: [uuidv4(),uuidv4()],
            date: chance.date(),
            isPayed : true,
            meta:{
                Comment:'Deliver it to me ad fast as you can'
            }
        });
        const shoulStayOrder = new Order({
            userId: uuidv4(),
            productsIds: [uuidv4(),uuidv4()],
            date: chance.date(),
            isPayed : true,
            meta:{
                Comment:'Deliver it to me ad fast as you can'
            }
        });

        const [willBeDeletedAddedOrder, shouldStayAddedOrder] = 
        await Promise.all([ordersRepository.add(willBeDeletedOrder), ordersRepository.add(shoulStayOrder)]);
        expect(willBeDeletedAddedOrder).toBeDefined();
        expect(shouldStayAddedOrder).toBeDefined();

        //delete one order
        const deletedOrder = await ordersRepository.delete(willBeDeletedAddedOrder);
        expect(deletedOrder).toEqual(willBeDeletedAddedOrder);

        //check that just relevant order
        const shouldBeDefinedOrder = await ordersRepository.getById(shouldStayAddedOrder.id);
        expect(shouldBeDefinedOrder).toBeDefined();
    })
    test('New order should be added and returned', async() =>{
        //add new order
        const testOrder = new Order({
            userId: uuidv4(),
            productsIds: [uuidv4(),uuidv4()],
            date: chance.date(),
            isPayed : true,
            meta:{
                Comment:'Deliver it to me ad fast as you can'
            }
        });

        const addedOrder = await ordersRepository.add(testOrder);
        expect(addedOrder).toBeDefined();
        //update an order
        const clonedOrder = cloneDeep({
            ...addedOrder,
            isPayed:false,
            productsIds: [...testOrder.productsIds, uuidv4()]
        });

        const updatedOrder = await ordersRepository.update(clonedOrder);

        //check the update
        expect(updatedOrder).toEqual(clonedOrder);
    })
})