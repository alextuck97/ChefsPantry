const assert = require("assert");
const express = require("express");
const body_parser = require("body-parser");

const port = 3000;
var app = express();
app.dbConnected = false;

const middle_wares = require("./middle-ware").middle_wares;

/**Base middleware***************/

app.use(body_parser.json());
app.use(middle_wares);

/********************************/

/**Routes***********************/

const recipe_routes = require("./routes/recipe_routes");

/***************************** */

const db = require("./db");
const collectionName = "recipes";

if(process.argv[2] === "production"){
    var dbName = "production_recipes";
} else{
    var dbName = "sample_recipes";
}





const dbCollection = db.initialize(dbName, collectionName, app);

app.use("/recipes", async function(request, response, next){
    request.dbCollection = await dbCollection;
    
    next();
}, recipe_routes);



app.listen(port, () =>  {
    console.log(`Listening on port ${port}`);
})



module.exports = {
    app
}







