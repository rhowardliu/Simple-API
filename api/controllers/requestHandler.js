const queryBuilder = require('../database/db_queries')
const con = require('../database/db_connection').con;
const table = 'people';


uniqueId = () =>{
    return (new Date()).getTime()%99;
}

addToDb = (obj, onAdd) =>{
    // obj['id'] = uniqueId();
    myQuery = queryBuilder.addEntry(table, obj);
    console.log(myQuery);
    con.query(myQuery, (err, results) =>{
        if(err) {
            err.statusCode = 500;
            throw err;
        };
        console.log(results);
        onAdd();
    });
    
}

module.exports = {
    addToDb,

}