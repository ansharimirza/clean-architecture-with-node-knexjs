const { 
    user : {
        addUserUseCase,
        getUserByIdUseCase,
        updateUserUseCase,
        deleteUserUseCase
    }
} = require('../../../src/useCases');

const {
    User,
    constants: {
        userConstants: {
            genders
        }
    }
} = require('../../../src/entities');

const Chance = require('chance');

const chance = new Chance();

const {
    v4:uuidv4
} = require('uuid');


describe('User use case', () =>{

    const mockUserRepo = {
        add: jest.fn(async user => ({
            ...user,
            id:uuidv4()
        })),
        getById: jest.fn(async id => ({
            id,
            name: chance.name(),
            lastName: chance.last(),
            gender: genders.NOT_SPECIFIED,
            meta:{}
        })),
        update: jest.fn(async user => user),
        delete: jest.fn(async user => user)
    }
    
    const dependencies = {
        usersRepository: mockUserRepo
    }

    describe('add user use case', () =>{
        test('User shoul be added', async () =>{
            //create user data
            const testUserData = new User({
                name: chance.name(),
                lastName: chance.last(),
                gender: genders.Male,
                meta:{
                    hair: {
                        color: 'red'
                    }
                }
            });

            //add a user using the use case
            const addedUser = await addUserUseCase(dependencies).execute(testUserData);
            
            //check the received data
            expect(addedUser).toBeDefined();
            expect(addedUser.id).toBeDefined();
            expect(addedUser.name).toBe(testUserData.name);
            expect(addedUser.lastName).toBe(testUserData.lastName);
            expect(addedUser.gender).toBe(testUserData.gender);
            expect(addedUser.meta).toEqual(testUserData.meta);

            //check that the dependency called as expected
            const call = mockUserRepo.add.mock.calls[0][0];
            expect(call.id).toBeUndefined();
            expect(call.name).toBe(testUserData.name);
            expect(call.lastName).toBe(testUserData.lastName);
            expect(call.gender).toBe(testUserData.gender);
            expect(call.meta).toEqual(testUserData.meta);
        })
    })

    describe('get user use case', () => {
        test('User should be returned by id', async () => {
            //generate fake id
            const fakeId = uuidv4();
            //call get user by id
            const userById = await getUserByIdUseCase(dependencies).execute({
                id: fakeId
            });
            //check the data
            expect(userById).toBeDefined();
            expect(userById.id).toBe(fakeId);
            expect(userById.name).toBeDefined();
            expect(userById.lastName).toBeDefined();
            expect(userById.gender).toBeDefined();
            expect(userById.meta).toBeDefined();

            //check the mock
            const expectedId = mockUserRepo.getById.mock.calls[0][0];
            expect(expectedId).toBe(fakeId);
        })
    })

    describe('Update user use case',  () => {
        test('User should be updated', async () => {
            //create a user data
            const testData = new User({
                id: uuidv4(),
                name: chance.name(),
                lastName: chance.last(),
                gender: genders.Male,
                meta:{
                    education: {
                        school: 'full'
                    }
                }
            });

            //call update user
            const updatedUser = await updateUserUseCase(dependencies).execute({
                user: testData
            });

            //check the data
            expect(updatedUser).toEqual(testData);

            //check the result
            const expectedUser = mockUserRepo.update.mock.calls[0][0];

            //check the call
            expect(expectedUser).toEqual(testData);
        })
    })

    describe('Delete user use case', () => {
        test('User should be deleted', async () => {
            //create a user data
            const testData = new User({
                id: uuidv4(),
                name: chance.name(),
                lastName: chance.last(),
                gender: genders.Male,
                meta:{
                    education: {
                        school: 'full'
                    }
                }
            });
            //call delete
            const deletedUser = await deleteUserUseCase(dependencies).execute({
                user: testData
            });

            //check the data
            expect(deletedUser).toEqual(testData);

            //check the result
            const expectedUser = mockUserRepo.delete.mock.calls[0][0];

            //check the call
            expect(expectedUser).toEqual(testData);
        })
    })
})