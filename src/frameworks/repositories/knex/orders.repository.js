const repository = () => {
    //Model
    const OrdersModel = require('../../models/knex/orders');

    //crud executables
    return {
        add: async order => {
            return await OrdersModel.query().insert(order);
        },
        update: async order => {
            const {
                id
            } = order;

            return await OrdersModel.query().patchAndFetchById(id, {
                ...order,
                updatedAt: new Date()
            });
        },
        delete: async order => {
            const {
                id
            } = order;

            return await OrdersModel.query().patchAndFetchById(id, {
                ...order,
                deletedAt: new Date()
            });
        },
        getById: async id => {
            return await OrdersModel.query().findOne({
                id: id,
                deletedAt: null
            });
        }
    }
}

module.exports = repository();