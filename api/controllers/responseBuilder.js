let PageNotFound = errorResponse(404, 'Page Not Found');
let InvalidFormat = errorResponse(400, 'Bad request');
let InternalError = errorResponse(500, 'Internal Server Error');


function errorResponse(status_code, message) {
    return {
    'status code': status_code,
    message,
    }
}

module.exports = {
    PageNotFound,
    InvalidFormat,
    InternalError

}