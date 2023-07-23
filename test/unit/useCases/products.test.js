const { 
    product : {
        addProductUseCase,
        getProductByIdUseCase,
        updateProductUseCase,
        deleteProductUseCase
    },
} = require('../../../src/useCases');

const {
    Product,
} = require('../../../src/entities');

const Chance = require('chance');

const chance = new Chance();

const {
    v4:uuidv4
} = require('uuid');

const {cloneDeep} = require('lodash');


describe('Product use case', () =>{

    //create a product data
    const testProduct = new Product({
        name: chance.name(),
        description: chance.sentence(),
        images: [uuidv4(),uuidv4()],
        price: chance.natural(),
        color: chance.color(),
        meta:{
            comment: 'the best product'
        }
    });

    const mockProductRepo = {
        add: jest.fn(async product => ({
            ...product,
            id:uuidv4()
        })),
        getById: jest.fn(async id => ({
            id,
            name: chance.name(),
            description: chance.sentence(),
            images: [uuidv4(),uuidv4()],
            price: chance.natural(),
            color: chance.color(),
            meta:{
                comment: 'the best product'
            }
        })),
        update: jest.fn(async product => product),
        delete: jest.fn(async product => product)
    }
    
    const dependencies = {
        productsRepository: mockProductRepo
    }

    describe('add product use case', () =>{
        test('Product shoul be added', async () =>{
            //add a product using the use case
            const addedProduct = await addProductUseCase(dependencies).execute(testProduct);

            //check the received data
            expect(addedProduct).toBeDefined();
            expect(addedProduct.id).toBeDefined();
            expect(addedProduct.name).toBe(testProduct.name);
            expect(addedProduct.description).toBe(testProduct.description);
            expect(addedProduct.images).toEqual(testProduct.images);
            expect(addedProduct.price).toBe(testProduct.price);
            expect(addedProduct.color).toBe(testProduct.color);
            expect(addedProduct.meta).toEqual(testProduct.meta);

            //check that the dependency called as expected
            const expectProductData = mockProductRepo.add.mock.calls[0][0];
            expect(expectProductData).toEqual(testProduct);
        })
    })

    describe('get product use case', () => {
        test('Product should be returned by id', async () => {
            //generate fake id
            const fakeId = uuidv4();
            //call get product by id
            const productById = await getProductByIdUseCase(dependencies).execute({
                id: fakeId
            });
            //check the data
            expect(productById).toBeDefined();
            expect(productById.id).toBe(fakeId);
            expect(productById.name).toBeDefined();
            expect(productById.description).toBeDefined();
            expect(productById.images).toBeDefined();
            expect(productById.price).toBeDefined();
            expect(productById.color).toBeDefined();
            expect(productById.meta).toBeDefined();

            //check the mock
            const expectedId = mockProductRepo.getById.mock.calls[0][0];
            expect(expectedId).toBe(fakeId);
        })
    })

    describe('Update product use case',  () => {
        test('Product should be updated', async () => {
            const mockProduct = {
                ...testProduct,
                id: uuidv4()
            }
            //call update product
            const updatedProduct = await updateProductUseCase(dependencies).execute({
                product: mockProduct
            });

            //check the data
            expect(updatedProduct).toEqual(mockProduct);

            //check the result
            const expectedProduct = mockProductRepo.update.mock.calls[0][0];

            //check the call
            expect(expectedProduct).toEqual(mockProduct);
        })
    });

    describe('Delete product use case', () => {
        test('product should be deleted', async () => {
            const mockProduct = {
                ...testProduct,
                id: uuidv4()
            }
            
            //call delete
            const deleteProduct = await deleteProductUseCase(dependencies).execute({
                product: cloneDeep(mockProduct)
            });

            //check the data
            expect(deleteProduct).toEqual(mockProduct);

            //check the result
            const expectedProduct = mockProductRepo.delete.mock.calls[0][0];

            //check the call
            expect(expectedProduct).toEqual(mockProduct);
        })
    })
    
})