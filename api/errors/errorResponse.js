
errorResponse = (err) => {
    return {
    'status code': err.statusCode,
    message: err.message,
    }
}

pageNotFound = (err, req, res, next) =>{
    if (err.statusCode) next(err);

    err.message = 'Page Not Found';
    err.statusCode = 404;
    next(err);
}


customError = (err, req, res, next) =>{
    console.log("Caught Error \n", err);
    res.status(err.statusCode).json(errorResponse(err));
}

module.exports = {
    customError,
    pageNotFound
}