const assert = require("assert");
const express = require("express");
const body_parser = require("body-parser");

const port = 3000;
var app = express();
app.dbConnected = false;

const loggingfns = require("./logging").loggingfns;

/**Base middleware***************/

app.use(body_parser.json());
app.use(loggingfns);

/********************************/

/**Routes***********************/

const recipe_routes = require("./routes/recipe_routes");

/***************************** */

const db = require("./db");
const dbName = "sample_recipes";
const collectionName = "recipes";



db.initialize(dbName, collectionName, function(dbCollection) {

    app.use("/recipes", function(request, response, next){
        request.dbCollection = dbCollection;
        next();
    }, recipe_routes);

    
    
    app.listen(port, () =>  {
        console.log(`Listening on port ${port}`);
    })

    app.emit("dbConnected");
    app.dbConnected = true;


},function(err) {
    throw (err);
})





module.exports = {
    app
}







