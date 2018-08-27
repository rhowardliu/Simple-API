const queryBuilder = require('../database/db_queries')
const con = require('../database/db_connection').dbConnect();
// const table = 'people';

queryDb = (queryTable, queryType, queryObj) =>{
    return new Promise((resolve, reject)=>{
        myQuery = queryBuilder[queryType](queryTable,queryObj);
        console.log("Executing SQL query: ", myQuery);
        con.query(myQuery, (err, results)=> {
            if (err){
                console.log('err', err);
                err.statusCode = 500;
                err.message = 'Internal Server Error';
                reject(err);
            }
            console.log("DB Results", results);
            resolve(results);
        });

    });

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