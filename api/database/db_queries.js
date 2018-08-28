const knex = require('./db_connect');
const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;


insertEntry = (table, object) =>{
// returns array of ids
    return knex(table).insert(object);
}

selectEntry = (table, id) =>{
//returns array of object
    return knex.select(knex.raw(`*, DATE_FORMAT(birthDate,'%Y-%m-%d') AS birthDate`)).table(table).where('id', id);
}

selectMultiEntries = (table, obj) =>{
//returns array of object
    if (!obj){
        obj = {limit:DEFAULT_LIMIT, offset:DEFAULT_OFFSET}
    }
    return knex(table).select(knex.raw(`*, DATE_FORMAT(birthDate,'%Y-%m-%d') AS birthDate`)).limit(obj.limit).offset(obj.offset);
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
