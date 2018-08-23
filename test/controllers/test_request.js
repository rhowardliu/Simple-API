const expect = require('../test_init').expect;

describe('Test Requests to Database',()=>{
    let con = null;
    let reqHandler = null;
    before(()=>{
        con = require('../../api/database/db_connection').dbConnect('test');
        reqHandler = require('../../api/controllers/requestHandler');
        createTable = `CREATE TABLE IF NOT EXISTS pets( id INT PRIMARY KEY auto_increment, type VARCHAR(30), name VARCHAR(30), birthDate DATE)`
        con.query(createTable, (err, results)=>{
            if (err) console.log("create table error", err);
        });
    });
    after (()=>{
        dropTable = `DROP TABLE pets;`
        con.query(dropTable, (err, results)=>{
            if (err) console.log("drop table error", err);
        });
        console.log("ending already?!");
        // con.end();
    })

    it('should add an object to database',()=>{
        scruffy = {id:1, type:'dog', name:'Scruffy', birthDate: '1990-01-01'};
        dbResult = reqHandler.addToDb('pets', scruffy)[0];
        expect(dbResult).to.deep.equal(scruffy);
    })


})
