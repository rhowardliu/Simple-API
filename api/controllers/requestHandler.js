const queryBuilder = require('../database/db_queries')
const con = require('../database/db_connection').con;
// const table = 'people';

queryDb = (queryTable, queryType, queryObj) =>{
    return new Promise((resolve, reject)=>{
        myQuery = queryBuilder[queryType](queryTable,queryObj);
        console.log("Executing SQL query: ", myQuery);
        con.query(myQuery, (err, results)=> {
            if (err){
                err.statusCode = 500;
                err.message = 'Internal Server Error';
                reject(err);
            }
            console.log(results);
            resolve(results);
        });

    });

}


addToDb = async(table, obj) =>{
    dbObj = await queryDb(table, 'addEntry', obj);
    fetchedObj = await getFromDb(table, dbObj.insertId);
    return (fetchedObj);
};

updateDb = (table, obj) =>{
    return queryDb(table, 'updateEntry', obj);
};

getFromDb = async (table, id) =>{
    dbObj = await queryDb(table, 'getEntry', id);
    if (!dbObj.length) Promise.reject(new Error);
    return dbObj;
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