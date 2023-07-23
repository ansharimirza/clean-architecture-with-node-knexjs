const { Model } = require('objection');
const {connect} = require('../../database/knex');
const visibilityPlugin = require('objection-visibility').default;
Model.knex(connect());

class UsersModel extends visibilityPlugin(Model) {
    static get tableName() {
        return 'users';
    }

    static get hidden () {
        return ['created_by','created_at','updated_by','updated_at','deleted_by','deleted_at']
    }
    
}

module.exports = UsersModel;