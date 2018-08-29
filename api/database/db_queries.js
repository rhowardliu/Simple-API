const knex = require('./db_connect');



insertEntry = (table, object) =>{
// returns array of ids
	return knex(table).insert(object);
};

selectEntry = (table, id) =>{
//returns array of object
	return knex.select(knex.raw('*, DATE_FORMAT(birthDate,\'%Y-%m-%d\') AS birthDate')).table(table).where('id', id);
};

selectMultiEntries = (table, obj) =>{
//returns array of object
	return knex(table).select(knex.raw('*, DATE_FORMAT(birthDate,\'%Y-%m-%d\') AS birthDate')).limit(obj.limit).offset(obj.offset);
};

deleteEntry = (table, id) =>{
// returns number of affected rows
	return knex(table).where('id', id).del();
};

updateEntry = (table, obj) =>{
// returns number of affected rows
	return knex(table).where('id', obj.id).update(obj);
};

countEntries = (table) =>{
// returns array containing object that has a key: count('id')
	return knex(table).count('id');
};

module.exports = {
	insertEntry,
	selectEntry,
	selectMultiEntries,
	deleteEntry,
	updateEntry,
	countEntries
};
