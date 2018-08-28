const expect = require('./test_init').expect;
const dbQuery = require('../api/database/db_queries');
describe('Test Requests to Database',function() {
    const knex = require('../api/database/db_connect');
    before(async ()=>{
        await knex.schema.createTable('pets', (table)=>{
            table.increments('id');
            table.string('hobby');
            table.string('name');
            table.date('bday');
        })
    })


    describe('Database successful queries', async function(){
        scruffy = {id:1, name:'Scruffy', bday: '1999-01-01', hobby:'woof'};
        before(()=>{
            it('should add an object to database',async function (){
                dbResult = await dbQuery.insertEntry('pets', scruffy);
                expect(dbResult[0]).to.equal(1);
            });
        });

        // it('should edit an object of database',async function (){
        //     scruffy2 = {id:1, name:'Scruffy', bday: '1999-05-01', hobby:'chasing tails'};
        //     dbResult = await dbQuery.updateEntry('pets', scruffy);
        //     expect(dbResult[0]).to.equal(1);
        // });

        it('should retrieve an object from database',async function (){
            dbResult = await dbQuery.selectEntry('pets', 1);
            expect(dbResult[0]).to.deep.equal(scruffy);
        });

        it('should retrieve all objects in a table',async function (){
            scruffy2 = {id:1, name:'Scruffy', bday: '1999-05-01', hobby:'chasing tails'};
            config = {limit:5, offset:0}
            dbResult = await dbQuery.selectMultiEntries('pets', config);
            expect(dbResult).to.deep.equal([scruffy2]);
        });

        after(()=>{
            it('should edit an object of database',async function (){
                scruffy2 = {id:1, name:'Scruffy', bday: '1999-05-01', hobby:'chasing tails'};
                dbResult = await dbQuery.updateEntry('pets', scruffy);
                expect(dbResult[0]).to.equal(1);
            });
        });
        // it('should delete object in database',async function (){
        //     dbResult = await dbQuery.deleteEntry('pets', 1);
        //     expect(dbResult).to.equal([1]);
        // });
    })



    after(async ()=>{
        console.log('dropping');
        await knex.schema.dropTableIfExists('pets');
    })

});