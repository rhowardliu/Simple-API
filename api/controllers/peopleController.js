const reqHandler = require('./requestHandler');
const resBuilder = require('./responseBuilder');
const model = require('../models/db_model');
const modelValidate = require('../models/model_validate').modelValidate;
const idBuilder = require('../models/id_builder');

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

const addPerson = async (req, res ,next) => {
	try{
  
		const receivedObj = await modelValidate(req.body, model.person);
		await idBuilder.addIdToObj(receivedObj);
		await reqHandler.addToDb('people', receivedObj);
		await resBuilder.singleEntityResponse('people', receivedObj);
		res.status(200).send(receivedObj);

	}
	catch(err){
		next(err);
	}

};

const updatePersonById = async (req, res, next) => {
	try{
		const receivedObj = await modelValidate(req.body, model.person);
		const id = req.params.personId;
		receivedObj.id = id;
  
		await reqHandler.updateDb('people', receivedObj);

		await resBuilder.singleEntityResponse('people', receivedObj);
		res.status(200).send(receivedObj);


	}
	catch(err){
		next(err);
	}
};

const getPersonById = async (req, res, next) => {
	try{
		const id = req.params.personId;
		const dbObject = await reqHandler.getFromDb('people', id);
		resBuilder.singleEntityResponse('people', dbObject);
		res.status(200).json(dbObject);
	}
	catch(err){
		next(err);
	}


};

const deletePersonById = async (req, res, next) =>{
	try{
		const id = req.params.personId;
		const dbObject = await reqHandler.getFromDb('people', id);
		reqHandler.deleteFromDb('people', id);

		await resBuilder.singleEntityResponse('people', dbObject);
		res.status(200).json(dbObject);

	}
	catch(err){
		next(err);
	}
};

const getPeople = async (req, res, next) => {
	try{
		let limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
		let offset = parseInt(req.query.offset) || DEFAULT_OFFSET;
		let total = reqHandler.getCountFromDb('people');
		let dbObject = reqHandler.getMultiFromDb('people', {limit, offset});
		let resObj = resBuilder.multiEntityResponse('people', await dbObject, {limit, offset, total: await total});
		res.status(200).json(resObj);
	}
	catch(err){
		next(err);
	}
};

module.exports = {
	addPerson,
	getPersonById,
	deletePersonById,
	updatePersonById,
	getPeople

};