const reqHandler = require('./requestHandler');
const resBuilder = require('./responseBuilder');
const model = require('../models/db_model')
const modelValidate = require('../models/model_validate');

const addPerson = (req, res ,next) =>{
  try{
  modelValidate(req.body, model.person)
  reqHandler.addToDb(req.body);
  res.status(200).send(req.body);
  }
  catch(err){
    console.log(err);
    next(err);
  }


}





module.exports = {
  addPerson,

}