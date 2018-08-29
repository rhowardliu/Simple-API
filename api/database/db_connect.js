var config      = require('../../knexfile');  
var env         = process.env.ENV || 'dev';  
var knex        = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest(); 
