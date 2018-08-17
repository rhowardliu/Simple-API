

errorResponse = (err) => {
    return {
    'status code': err.statusCode,
    message: err.message,
    }
}

pageNotFound = (req, res, next) =>{
    let error = new Error ('page Not Found');
    error.statusCode = 404;
    next(err);
}


customError = (err, req, res, next) =>{
    res.status(err.statusCode).json(errorResponse(err));
}

module.exports = {
    customError,
    pageNotFound
}