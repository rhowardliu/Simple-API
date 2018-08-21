const queryBuilder = require('../database/db_queries')
const con = require('../database/db_connection').con;
// const table = 'people';

queryDb = (queryTable, queryType, queryObj) =>{
    return new Promise((resolve, reject)=>{
        console.log("Query Object ", queryObj);
        myQuery = queryBuilder[queryType](queryTable,queryObj);
        console.log("Executing SQL query: ", myQuery);
        con.query(myQuery, (err, results)=> {
            if (err){
                err.statusCode = 500;
                reject(err);
            }
            resolve(results);
        });

    });

}


addToDb = (table, obj) =>{
    return queryDb(table, 'addEntry', obj);
};

updateDb = (table, obj) =>{
    return queryDb(table, 'updateEntry', obj);
};

getFromDb = (table, id) =>{
    return queryDb(table, 'getEntry', id);
};

deleteFromDb = async (table, id) => {
    dbObj = await getFromDb(table, id);
    await queryDb(table, 'deleteEntry', id);
    return dbObj;
};

getMultiFromDb = (table, limit, offset) =>{
    obj = {limit, offset};
    return queryDb(table, 'getMultiEntries', obj);
}

module.exports = {
    addToDb,
    getFromDb,
    deleteFromDb,
    updateDb,
    getMultiFromDb
}