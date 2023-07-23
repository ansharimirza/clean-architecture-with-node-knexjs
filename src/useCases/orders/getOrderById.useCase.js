
module.exports = dependencies => {
    const {ordersRepository} = dependencies;
    if (!ordersRepository) {
        throw new Error('The order repository should be exists in dependencies');
    }

    const execute = ({
        id
    }) => {
        return ordersRepository.getById(id);
    }

    return {
        execute
    }
}

