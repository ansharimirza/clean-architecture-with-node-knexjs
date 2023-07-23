module.exports = {
    connect: () => {
        const environment = 'development';
        const config = require('../../../../knexfile')[environment]
        const pgsql = require("knex")(config);

        pgsql.raw("SELECT 1").then(() => {
            console.log("PostgreSQL connected");
        })
        .catch((e) => {
            console.log("PostgreSQL not connected");
            console.error(e);
        });

        return pgsql;
    },
}