const knex = require('../database/db_queries')

queryDb = async (queryTable, queryType, queryObj) =>{        
    const dbObj =  await knex[queryType](queryTable, queryObj);
    if (dbObj.error){
        err.statusCode = 500;
        err.message = 'Internal Server Error';
        reject(err);
    }
    if (!dbObj){
        reject(new Error);
    }
    return (dbObj);
}



addToDb = async(table, obj) =>{
    dbObj = await queryDb(table, 'addEntry', obj);
    obj.id = dbObj.insertId;
    return obj;
};

updateDb = (table, obj) =>{
    return queryDb(table, 'updateEntry', obj);
};

getFromDb = async (table, id) =>{
    dbObj = await queryDb(table, 'getEntry', id);
    if (!dbObj.length) Promise.reject(new Error);
    return dbObj[0];
};

deleteFromDb = async (table, id) => {
    dbObj = await getFromDb(table, id);
    await queryDb(table, 'deleteEntry', id);
    return dbObj;
};

getMultiFromDb = async (table, limit, offset) =>{
    obj = {limit, offset};
    dbObj = await queryDb(table, 'getMultiEntries', obj);
    if (!dbObj.length) Promise.reject(new Error);
    return dbObj;
}

module.exports = {
    addToDb,
    getFromDb,
    deleteFromDb,
    updateDb,
    getMultiFromDb
}