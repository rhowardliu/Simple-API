
exports.up = function(knex) {
	return knex.schema.createTableIfNotExists('people', (table)=>{
		table.increments('id').primary();
		table.string('name');
		table.date('birthDate');
		table.string('hobby');
	});
  
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('people');
  
};
