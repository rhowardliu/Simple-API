
errorResponse = (err) => {
    return {
    'status code': err.statusCode,
    message: err.message,
    }
}

pageNotFound = (req, res, next) =>{
    next(new Error);
}


customError = (err, req, res, next) =>{
    if (!err.statusCode){
        err = new Error('Page Not Found');
        err.statusCode = 404;
    } 

    console.log("Caught Error \n", err);
    res.status(err.statusCode).json(errorResponse(err));
}

module.exports = {
    customError,
    pageNotFound
}