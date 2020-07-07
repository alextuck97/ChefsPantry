function logger(req, res, next) {
    console.log("Request url: ", req.originalUrl, " Request type: ", req.method);
    next();
}

const loggingfns = [ logger ];

module.exports = {
    loggingfns
}