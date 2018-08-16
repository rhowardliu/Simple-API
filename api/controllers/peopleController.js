const reqHandler = require('./requestHandler');
const resBuilder = require('./responseBuilder');
const model = require('../models/db_model')

const addPerson = (req, res) =>{
  personModel = model.person;
  if (!modelValidate(req.body, personModel)){
    return res.send(resBuilder.invalidRequest());
  }
  reqHandler.addToDb
}

const modelValidate = (obj, model)=>{
  for (let key of model.attributes){
    if (!obj.hasOwnProperty(key)) return false;
  }
  return true;
}
