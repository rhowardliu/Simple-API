
const errorResponse = (err) => {
	return {
		'status code': err.statusCode,
		message: err.message,
	};
};

const pageNotFound = (req, res, next) =>{
	next(new Error);
};


const customError = (err, req, res, next) =>{
	if (!err.statusCode){
		err = new Error('Page Not Found');
		err.statusCode = 404;
	} 
	console.log(`Error ${err.statusCode}: ${err.message}`);
	res.status(err.statusCode).json(errorResponse(err));
};

module.exports = {
	customError,
	pageNotFound
};