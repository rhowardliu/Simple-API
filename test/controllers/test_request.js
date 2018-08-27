const expect = require('../test_init').expect;

describe('Test Requests to Database',function() {
    con =  require('../../api/database/db_connection').dbConnect('test');
    reqHandler = require('../../api/controllers/requestHandler');

     before( function (){
        createTable = `CREATE TABLE IF NOT EXISTS pets( id INT PRIMARY KEY auto_increment, type VARCHAR(30), name VARCHAR(30), birthDate DATE)`
        con.query(createTable, (err, results)=>{
            if (err) console.log("create table error", err);
        });
    });

     describe('Database functions', function(){
        it('should add an object to database',async function (){
            scruffy = {id:1, type:'dog', name:'Scruffy', birthDate: '1990-01-01'};
            dbResult = await reqHandler.addToDb('pets', scruffy);
            expect(dbResult).to.deep.equal(scruffy);
        });
    })



     after(function (){
        dropTable = `DROP TABLE pets;`
        con.query(dropTable, (err, results)=>{
            if (err) console.log("drop table error", err);
        });
        con.end();
    });

})
