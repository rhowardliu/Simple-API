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



getFromDb = async (table, id) =>{
    dbObj = await queryDb(table, 'selectEntry', id);
    if (!dbObj.length) throw new Error;
    return dbObj[0];
};

addToDb = async (table, obj) =>{
    dbObj = await queryDb(table, 'insertEntry', obj);
    if (!dbObj.length) throw new Error;
    return dbObj;
};

updateDb = (table, obj) =>{
    return queryDb(table, 'updateEntry', obj);
};


deleteFromDb = (table, id) => {    
    return queryDb(table, 'deleteEntry', id);
};

getMultiFromDb = async (table, params) =>{
    dbObj = await queryDb(table, 'selectMultiEntries', params);
    if (!dbObj.length) throw new Error;
    return dbObj;
}

module.exports = {
    addToDb,
    getFromDb,
    deleteFromDb,
    updateDb,
    getMultiFromDb
}