const mysql = require('mysql');
const Promise = require('promise');
const db_config = require('./db_config')


// let con =Promise.resolve(mysql.createConnection(db_config))
// let con = mysql.createConnection(db_config);

let connection = ()=>{
    let con = mysql.createConnection(db_config);
    return Promise.resolve(con);
};

connection()
    .then(success => createDB(success)
    )
    .catch(err=>{
        console.log(err.stack);
    })

function createDB(con){
    con.query("CREATE DATABASE mydb", (err, result)=>{
        console.log("database created ", result)
    })
}
console.log('hello world');
// con.connect((err)=>{
//     if (err) throw err;
//     console.log("Connected to MySQL database.");
// })