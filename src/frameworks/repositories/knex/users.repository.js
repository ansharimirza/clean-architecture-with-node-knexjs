const repository = () => {
    //Model
    const UsersModel = require('../../models/knex/users');

    //crud executables
    return {
        add: async user => {
            return await UsersModel.query().insert(user);
        },
        update: async user => {
            const {
                id
            } = user;

            return await UsersModel.query().patchAndFetchById(id, {
                ...user,
                updatedAt: new Date()
            });
        },
        delete: async user => {
            const {
                id
            } = user;

            return await UsersModel.query().patchAndFetchById(id, {
                ...user,
                deletedAt: new Date()
            });
        },
        getById: async id => {
            return await UsersModel.query().findOne({
                id: id,
                deletedAt: null
            });
        }
    }
}

module.exports = repository();