const repository = () => {
    //Model
    const ProductsModel = require('../../models/knex/products');

    //crud executables
    return {
        add: async product => {
            return await ProductsModel.query().insert(product);
        },
        update: async product => {
            const {
                id
            } = product;

            return await ProductsModel.query().patchAndFetchById(id, {
                ...product,
                updatedAt: new Date()
            });
        },
        delete: async product => {
            const {
                id
            } = product;

            return await ProductsModel.query().patchAndFetchById(id, {
                ...product,
                deletedAt: new Date()
            });
        },
        getById: async id => {
            return await ProductsModel.query().findOne({
                id: id,
                deletedAt: null
            });
        }
    }
}

module.exports = repository();