const {
    isEmpty
} = require('lodash');

const {
    Order
} = require('../../entities');

const {
    ResponseError,
} = require('../../frameworks/common');

const validator = require('./validator');

module.exports = dependencies => {
    const {
        ordersRepository,
    } = dependencies;

    if (!ordersRepository) {
        throw new Error('The order repository should be exists in dependencies');
    }

    const getValidationErrors = validator(dependencies);

    const execute = async ({
        userId,
        productsIds,
        date,
        isPayed,
        meta,
    }) => {
        const order = new Order({
            userId,
            productsIds,
            date,
            isPayed,
            meta,
        });

        const validationErrors = await getValidationErrors({
            order
        });

        if (!isEmpty(validationErrors)) {
            return Promise.reject(new ResponseError({
                status:403,
                msg:'validation error',
                reason:'some body send bad data',
                validationErrors
            }))
        }



        return ordersRepository.add(order);
    }

    return {
        execute
    }
}

