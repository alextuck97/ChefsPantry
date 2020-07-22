function logger(req, res, next) {
    console.log("[REQUEST] ", req.method, " ", req.originalUrl);
    next();
}





const middle_wares = [ logger ];

module.exports = {
    middle_wares
}