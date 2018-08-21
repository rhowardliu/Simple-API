const queryBuilder = require('../database/db_queries')
const con = require('../database/db_connection').con;
// const table = 'people';



addToDb = (table, obj) =>{
    myQuery = queryBuilder.addEntry(table, obj);
    console.log("Executing SQL query ", myQuery);
    con.query(myQuery, async (err, results) =>{
        if(err) {
            err.statusCode = await 500;
            throw err;
        };
        console.log(results);
    });
    
}

getFromDb = (table, id) =>{
    return new Promise((resolve, reject) => {
        myQuery = queryBuilder.getEntry(table, id);
        console.log("Executing SQL query ", myQuery);
        con.query(myQuery, (err, results) =>{
            if(err) {
                console.log ("error!! ", err);
                err.statusCode = 500;
                reject(err);
            };
            console.log("db results", results);
            resolve(results);
        
        });
    });

}

deleteFromDb = (table, id) => {
    myQuery = queryBuilder.deleteEntry(table, id);
    console.log("Executing SQL query ", myQuery);
    con.query(myQuery, async (err, results) =>{
        if(err) {
            err.statusCode = await 500;
            throw err;
        };
        console.log(results);
    });
}

module.exports = {
    addToDb,
    getFromDb,
    deleteFromDb,

}