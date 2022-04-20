const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

const createTable = (async () => {
    try {
        if(await knex.schema.hasTable('productos')){
            await knex.schema.dropTable('productos');
        }
        await knex.schema.createTable('productos', table => {
            table.increments('id');
            table.string('title', 15);
            table.string('thumbnail', 50);
            table.float('price');
            table.integer('stock');
        });
        console.log('Table productos created');
    } catch (err) {
        console.log(err);
    } finally {
        knex.destroy();
    }
});


module.exports = {
    createTable
};


