
exports.up = function(knex, Promise) {
	return knex.schema.createTableIfNotExists('people', (table)=>{
		table.increments('id').primary();
		table.string('name');
		table.date('birthDate');
		table.string('hobby');
	});
  
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('people');
  
};
