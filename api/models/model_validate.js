modelValidate = (obj, model) => {
	return new Promise ((resolve, reject) =>{
		let objRelevant = {};
		for (let key of model.attributes){
			if (!obj.hasOwnProperty(key)) {
				let err = new Error('Invalid format');
				err.statusCode = 400;
				reject(err);
			}
			objRelevant[key] = obj[key];
		}
		resolve(objRelevant);
	});
};


module.exports = {
	modelValidate,
    
};