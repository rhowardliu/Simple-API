const mysql = require('mysql');
const db_config = require('./db_config')


// let con =Promise.resolve(mysql.createConnection(db_config))
// let con = mysql.createConnection(db_config);

let con = mysql.createConnection(db_config);


dbConnect = ()=>{
    con.connect((err, result)=>{
        if (err) throw err;
        console.log ("Connected to MySQL database.");
        console.log ("result: ", result);
    });
}

module.exports = {
    dbConnect,
    con,
}