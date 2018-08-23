const mysql = require('mysql');
const db_config = require('./db_config');


// let con =Promise.resolve(mysql.createConnection(db_config))
// let con = mysql.createConnection(db_config);

let con = null;


dbConnect = (env)=>{
    if (!env && !con){
        throw new Error('Connection required without first connecting to database');
    }
    if (con) return con;
    con = mysql.createConnection(db_config[env]);
    con.connect((err, result)=>{
        if (err) {
            err.statusCode = 500;
            throw err;
        }
        console.log ("Connected to MySQL database.");
    });
    return con;

}

module.exports = {
    dbConnect,
}