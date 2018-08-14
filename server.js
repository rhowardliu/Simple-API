const express = require ('express');
const app = express();
let port = process.env.PORT || 8080;

app.listen(port);

function query (){
    let mquery = require('./api/database/db_functions').addEntry('people', {id: 3, name:'Nassim Taleb', birthDate:'1952-12-29', hobby:'uncertainty studies', })
    console.log('mquery ', mquery);
    let db = require('./api/database/db_connection')();
    mquery.then(success=> db.query(success, (err, result)=>{
            if (err) throw err;
            console.log("added");
        }))
        .catch(err=>console.log(err.stack));
}
query();
console.log('Server started on: ' + port);