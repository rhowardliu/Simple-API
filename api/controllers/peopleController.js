const reqHandler = require('./requestHandler');
const resBuilder = require('./responseBuilder');
const model = require('../models/db_model')
const modelValidate = require('../models/model_validate').modelValidate;
const idBuilder = require('../models/id_builder');

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;


const addPerson = async (req, res ,next) =>{
  try{
  
    const receivedObj = await modelValidate(req.body, model.person);
    await idBuilder.addIdToObj(receivedObj);
    let dBObject = await reqHandler.addToDb('people', receivedObj);
    await resBuilder.singleEntityResponse('people', dBObject[0]);
    res.status(200).send(dBObject);

  }
  catch(err){
    console.log("addPerson threw it");
    next(err);
  }

}

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
    console.log("updatePersonById threw it");
    next(err);
  }
}

const getPersonById = async (req, res, next) => {
  try{
    const id = req.params.personId;
    const dbObject = await reqHandler.getFromDb('people', id);

    console.log("dbObject is ", dbObject);
    await resBuilder.singleEntityResponse('people', dbObject[0]);
    res.status(200).json(dbObject[0]);
  }
  catch(err){
    console.log("getPersonById threw it")
    next(err);
  }


}

const deletePersonById = async (req, res, next) =>{
  try{
    const id = req.params.personId;
    const dbObject = await reqHandler.deleteFromDb('people', id);
    console.log("dbObject is ", dbObject);
    await resBuilder.singleEntityResponse('people', dbObject[0]);
    res.status(200).json(dbObject[0]);

  }
  catch(err){
    console.log("deletePersonById threw it")
    next(err);
  }
}

const getPeople = async (req, res, next) => {
  try{
    let limit = req.query.limit || DEFAULT_LIMIT;
    let offset = req.query.offset || DEFAULT_OFFSET;
    const dbObject = await reqHandler.getMultiFromDb('people', limit, offset);
    console.log("dbObject is ", dbObject);
    await resBuilder.multiEntityResponse('people', dbObject);
    res.status(200).json(dbObject);
  }
  catch(err){
    console.log("getPeople threw it")
    next(err);
  }
}

module.exports = {
  addPerson,
  getPersonById,
  deletePersonById,
  updatePersonById,
  getPeople

}