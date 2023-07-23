
module.exports = dependencies => {
    const {ordersRepository} = dependencies;
    if (!ordersRepository) {
        throw new Error('The order repository should be exists in dependencies');
    }

    const execute = ({
        order
    }) => {
        return ordersRepository.delete(order);
    }

    return {
        execute
    }
}

