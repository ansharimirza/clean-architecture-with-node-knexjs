const {Product} = require('../../entities');

module.exports = dependencies => {
    const {productsRepository} = dependencies;
    if (!productsRepository) {
        throw new Error('The product repository should be exists in dependencies');
    }

    const execute = ({
        name,
        description,
        images,
        price,
        color,
        meta
    }) => {
        const product = new Product({
            name,
            description,
            images,
            price,
            color,
            meta
        });

        return productsRepository.add(product);
    }

    return {
        execute
    }
}

