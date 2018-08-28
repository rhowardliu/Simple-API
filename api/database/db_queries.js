const knex = require('./db_connect');


insertEntry = (table, object) =>{
// returns array of ids
    return knex(table).insert(object);
}

selectEntry = (table, id) =>{
//returns array of object
    return knex.select().table(table).where('id', id);
}

selectMultiEntries = (table, obj) =>{
//returns array of object
    return knex(table).limit(obj.limit).offset(obj.offset);
}

deleteEntry = (table, id) =>{
// returns number of affected rows
    return knex(table).where('id', id).del();
}

updateEntry = (table, obj) =>{
// returns number of affected rows
    return knex(table).where('id', obj.id).update(obj);
}

module.exports = {
    insertEntry,
    selectEntry,
    selectMultiEntries,
    deleteEntry,
    updateEntry,
}