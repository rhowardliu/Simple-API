const reqHandler = require('./requestHandler');
const resBuilder = require('./responseBuilder');
const model = require('../models/db_model')
const modelValidate = require('../models/model_validate').modelValidate;
const idBuilder = require('../models/id_builder');

const addPerson = async (req, res ,next) =>{
  try{
  
  receivedObj = await modelValidate(req.body, model.person);
  await idBuilder.addIdToObj(receivedObj);
  await reqHandler.addToDb(receivedObj);

  await resBuilder.singleEntityResponse('people', receivedObj);

  res.status(201).send(receivedObj);


  }
  catch(err){
    console.log("addperson threw it")
    console.log(err);
    next(err);
  }


}





module.exports = {
  addPerson,

}