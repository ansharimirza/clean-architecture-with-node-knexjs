const {
    productsRepository
} = require('../../../src/frameworks/repositories/inMemory');
const {
    Product
} = require('../../../src/entities');
const {cloneDeep} = require('lodash');
const Chance = require('chance');
const chance = new Chance();



describe('Products Repository', () => {
    test('New product should be added and returned', async() =>{
        //create new product
        const testProduct = new Product({
            name: chance.name(),
            description: chance.sentence(),
            images: [chance.url(),chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta:{
                deliver:{
                    from:'china'
                }
            }
        });

        const addedProduct = await productsRepository.add(testProduct);

        expect(addedProduct).toBeDefined();
        expect(addedProduct.id).toBeDefined();
        expect(addedProduct.name).toBe(testProduct.name);
        expect(addedProduct.description).toBe(testProduct.description);
        expect(addedProduct.images).toEqual(testProduct.images);
        expect(addedProduct.price).toBe(testProduct.price);
        expect(addedProduct.color).toBe(testProduct.color);
        expect(addedProduct.meta).toEqual(testProduct.meta);
        //get the product
        const returnedProduct = await productsRepository.getById(addedProduct.id);
        expect(returnedProduct).toEqual(addedProduct);
    })
    test('New product should be added and returned', async() =>{
        //init two product
        const willBeDeletedProduct = new Product({
            name: chance.name(),
            description: chance.sentence(),
            images: [chance.url(),chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta:{
                deliver:{
                    from:'china'
                }
            }
        });
        const shoulStayProduct = new Product({
            name: chance.name(),
            description: chance.sentence(),
            images: [chance.url(),chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta:{
                deliver:{
                    from:'indonesia'
                }
            }
        });

        //add two products
        const [willBeDeletedAddedProduct, shouldStayAddedProduct] = 
        await Promise.all([productsRepository.add(willBeDeletedProduct), productsRepository.add(shoulStayProduct)]);

        expect(willBeDeletedAddedProduct).toBeDefined();
        expect(shouldStayAddedProduct).toBeDefined();
        //delete two products
        const deletedProduct = await productsRepository.delete(willBeDeletedAddedProduct);
        expect(deletedProduct).toEqual(willBeDeletedAddedProduct);

        //try to get the deleted product (should be undefined)
        const shouldBeUndefinedProduct = await productsRepository.getById(deletedProduct.id);
        expect(shouldBeUndefinedProduct).toBeUndefined();

        //check that second product defined (not deleted)
        const shouldBeDefinedProduct = await productsRepository.getById(shouldStayAddedProduct.id);
        expect(shouldBeDefinedProduct).toBeDefined();
    })
    test('New product should be added and returned', async() =>{
        //add products
        const testProduct = new Product({
            name: chance.name(),
            description: chance.sentence(),
            images: [chance.url(),chance.url()],
            price: chance.natural(),
            color: chance.color(),
            meta:{
                deliver:{
                    from:'korea'
                }
            }
        });

        const addedProduct = await productsRepository.add(testProduct);
        expect(addedProduct).toBeDefined();

        //update a product
        const clonedProduct = cloneDeep({
            ...addedProduct,
            name: chance.name(),
            description: chance.sentence(),
        });

        const updatedProduct = await productsRepository.update(clonedProduct);

        expect(updatedProduct).toEqual(clonedProduct);
    })
})