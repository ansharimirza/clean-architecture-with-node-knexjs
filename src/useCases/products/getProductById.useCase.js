
module.exports = dependencies => {
    const {productsRepository} = dependencies;
    if (!productsRepository) {
        throw new Error('The product repository should be exists in dependencies');
    }

    const execute = ({
        id
    }) => {
        return productsRepository.getById(id);
    }

    return {
        execute
    }
}

