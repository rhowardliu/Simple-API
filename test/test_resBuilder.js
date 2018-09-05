const expect = require('./test_init').expect;
const resBuilder = require('../api/controllers/responseBuilder');


describe('Generate the correct REST response', ()=>{

	it('should add hal link to an object that has id attribute', ()=>{
		let object = {id:1};
		let objectWithHal = {id:1, _links:{self: {href: 'localhost:8080/people/1'}}};
		resBuilder.singleEntityResponse('people', object);
		expect(object).to.deep.equal(objectWithHal);
	});

	it('should add hal collection link to a collection', ()=>{
		let collection = [{id:2}];
		let collectionHalFinal = {
			total:3,
			count:1,
			_embedded:{
				people: [{
					id:2,
					_links:{
						self:{href:'localhost:8080/people/2', }
					}
				}]},
			_links:{
				self:{href:'localhost:8080/people', },
				first:{href:'localhost:8080/people?limit=1&offset=0', },
				last:{href:'localhost:8080/people?limit=1&offset=2', },
				next:{href:'localhost:8080/people?limit=1&offset=2', },
				prev:{href:'localhost:8080/people?limit=1&offset=0', },
			}
		};
		let collectionWithHal = resBuilder.multiEntityResponse('people', collection, {limit: 1, offset: 1, total: 3});
		expect(collectionWithHal).to.deep.equal(collectionHalFinal);
	});


});