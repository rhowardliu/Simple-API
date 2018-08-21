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
                reject(err);
            }
            resolve(results);
        });

    });

}


addToDb = (table, obj) =>{
    return queryDb(table, 'addEntry', obj);
}

getFromDb = (table, id) =>{
    return queryDb(table, 'getEntry', id);
}

deleteFromDb = async (table, id) => {
    dbObj = await getFromDb(table, id);
    await queryDb(table, 'deleteEntry', id);
    return dbObj;
}


module.exports = {
    addToDb,
    getFromDb,
    deleteFromDb,

}