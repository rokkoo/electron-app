const knex = require('knex')({
   client: 'sqlite3',
   connection: {
      filename: __dirname + '/mydb.sqlite'
   },
   useNullAsDefault: false
});

exports.up = () => {
   // Verify is table exist
   knex.schema.hasTable('users').then(async exists => {
      console.log(exists);
      if (!exists) {
         // wait for schama
         await knex.schema
            .createTable('users', table => {
               table.increments('id');
               table.string('user_name');
            }) //
            .then(() => console.info('Table users created'))
            .catch(e => console.trace('Error creating schema users ', e));
      }
   });
};

exports.addUser = async userName =>
   await knex('users').insert({ user_name: userName });

exports.getUsers = async () => await knex.select('*').from('users');
