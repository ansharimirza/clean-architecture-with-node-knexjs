const useCases = require('../useCases');
const repositories = require('../frameworks/repositories/knex');

module.exports = {
    useCases,
    ...repositories
}