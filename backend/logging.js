function logger(req, res, next) {
    console.log("[REQUEST] ", req.method, " ", req.originalUrl);
    next();
}

const loggingfns = [ logger ];

module.exports = {
    loggingfns
}