const queryBuilder = require('../database/db_queries')
const con = require('../database/db_connection').con;
const table = 'people';


addToDb = (obj) =>{
    myQuery = queryBuilder.addEntry(table, obj);

    con.query(myQuery, (err, results) =>{
        if(err) {
            err.statusCode = 500;
            err.message = 'To Database failed.'
            throw err;
        };
        console.log(results);
    });
    
}

module.exports = {
    addToDb,

}