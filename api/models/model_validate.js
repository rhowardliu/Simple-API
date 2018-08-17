modelValidate = (obj, model) => {
  let objRelevant = {}
    for (let key of model.attributes){
      if (!obj.hasOwnProperty(key)) {
        let err = new Error('Invalid format');
        err.statusCode = 400;
        throw err;
      };
      objRelevant[key] = obj[key]
    }
    return objRelevant;
  }

module.exports = {
    modelValidate,
    
}