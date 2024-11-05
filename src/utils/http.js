const responseJson = (res, data, message, statusCode) => {
    res.status(statusCode).json({
        message,
        ...data, 
    });
};

const responseError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({
        message: error.message || "Internal Server Error",
        ...(error.details && { details: error.details }), 
    });
};

module.exports = {
    responseJson,
    responseError,
};
