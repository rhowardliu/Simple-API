const expect = require('./test_init').expect;
const dbQuery = require('../api/database/db_queries');
describe('Test Requests to Database',function() {
    const knex = require('../api/database/db_connect');
    before(async ()=>{
        await knex.schema.createTableIfNotExists('pets', (table)=>{
            table.increments('id');
            table.string('hobby');
            table.string('name');
            table.date('birthDate');
        })
    })


    describe('Database successful queries', async function(){
        scruffy = {id:1, name:'Scruffy', birthDate: '1999-01-01', hobby:'woof'};

        await it('should add an object to database', function (){
            dbResult = dbQuery.insertEntry('pets', scruffy);
            expect(dbResult).eventually.to.deep.equal([1]);
        });

        await it('should retrieve an object from database', function (){
            dbResult = dbQuery.selectEntry('pets', 1);
            expect(dbResult).eventually.to.deep.equal([scruffy]);
        });

        await it('should retrieve all objects in a table', function (){
            config = {limit:5, offset:0}
            dbResult = dbQuery.selectMultiEntries('pets', config);
            expect(dbResult).to.eventually.deep.equal([scruffy]);
        });

        await it('should edit an object of database', function (){
            scruffy2 = {id:1, name:'Scruffy', birthDate: '1999-05-01', hobby:'chasing tails'};
            dbResult = dbQuery.updateEntry('pets', scruffy);
            expect(dbResult).to.eventually.equal(1);
        });

        await it('should count number of objects of database', function (){
            dbResult = dbQuery.countEntries('pets');
            expect(dbResult).to.eventually.deep.equal( [{ 'count(`id`)':1 }] );
        });

        await it('should delete object in database', function (){
            dbResult = dbQuery.deleteEntry('pets', 1);
            expect(dbResult).to.eventually.equal(1);
        });
    });



    after(()=>{
        console.log('dropping');
        knex.schema.dropTableIfExists('pets');
    })

});