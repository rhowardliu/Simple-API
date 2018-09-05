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
		});
	});


	describe('Database successful queries', async function(){
		let scruffy = {id:1, name:'Scruffy', birthDate: '1999-01-01', hobby:'woof'};

		await it('should add an object to database', function (){
			let dbResult = dbQuery.insertEntry('pets', scruffy);
			expect(dbResult).eventually.to.deep.equal([1]);
		});

		await it('should retrieve an object from database', function (){
			let dbResult = dbQuery.selectEntry('pets', 1);
			expect(dbResult).eventually.to.deep.equal([scruffy]);
		});

		await it('should retrieve all objects in a table', function (){
			let config = {limit:5, offset:0};
			let dbResult = dbQuery.selectMultiEntries('pets', config);
			expect(dbResult).to.eventually.deep.equal([scruffy]);
		});

		await it('should edit an object of database', function (){
			let scruffy2 = {id:1, name:'Scruffy', birthDate: '1999-05-01', hobby:'chasing tails'};
			let dbResult = dbQuery.updateEntry('pets', scruffy2);
			expect(dbResult).to.eventually.equal(1);
		});

		await it('should count number of objects of database', function (){
			let dbResult = dbQuery.countEntries('pets');
			expect(dbResult).to.eventually.deep.equal( [{ 'count(`id`)':1 }] );
		});

		await it('should delete object in database', function (){
			let dbResult = dbQuery.deleteEntry('pets', 1);
			expect(dbResult).to.eventually.equal(1);
		});
	});



	after(()=>{
		knex.schema.dropTableIfExists('pets');
	});

});