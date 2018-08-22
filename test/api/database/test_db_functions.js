dbQueries = require('./api/database/db_functions');


query();

newPerson = {
    id: 2,
    name: 'Nassim Taleb',
    birthDate: '1958-12-29',
    hobby: 'Uncertainty analysis'
}

function query(){
    mquery = dbQueries.getEntry('people', 3);
    console.log('mquery: ', mquery);
    let db = require('./api/database/db_connection')();
    db.query(mquery, (err, result)=>{
        if (err) throw err;
        console.log(result);
    });
}