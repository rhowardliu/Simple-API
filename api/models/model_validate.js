modelValidate = (obj, model) => {
    for (let key of model.attributes){
      if (!obj.hasOwnProperty(key)) {
        let err = new Error('Invalid format');
        err.statusCode = 400;
        throw err;
      };
    }
  }

module.exports = {
    modelValidate,
    
}