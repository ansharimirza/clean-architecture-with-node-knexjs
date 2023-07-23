const { Model } = require('objection');
const {connect} = require('../../database/knex');
const visibilityPlugin = require('objection-visibility').default;
Model.knex(connect());

class OrdersModel extends visibilityPlugin(Model) {
    static get tableName() {
        return 'orders';
    }

    static get hidden () {
        return ['created_by','created_at','updated_by','updated_at','deleted_by','deleted_at']
    }
    
}

module.exports = OrdersModel;