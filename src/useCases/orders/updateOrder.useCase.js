const validator = require('./validator');

const {
    ResponseError,
} = require('../../frameworks/common');

const {
    isEmpty
} = require('lodash');

module.exports = dependencies => {
    const {
        ordersRepository
    } = dependencies;

    if (!ordersRepository) {
        throw new Error('The order repository should be exists in dependencies');
    }

    const getValidationErrors = validator(dependencies);

    const execute = async({
        order = {}
    }) => {
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

        return ordersRepository.update(order);
    }

    return {
        execute
    }
}

