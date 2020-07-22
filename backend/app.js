const assert = require("assert");
const express = require("express");
const body_parser = require("body-parser");

var app = express();


/**Base middleware***************/
const middle_wares = require("./middle-ware").middle_wares;
app.use(body_parser.json());
app.use(middle_wares);
/********************************/

/**Routes***********************/
const recipe_routes = require("./routes/recipe_routes");
/***************************** */


/***Database set up*********** */
const config = require("./config");
const MongoClient = require("mongodb").MongoClient;
const dbConnectionUrl = "mongodb+srv://" + config.MONGO_USERNAME +":" + config.MONGO_PW + "@cluster0.ugps3.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(dbConnectionUrl, {useUnifiedTopology : true});
const dbName = "production_recipes";
const collection = "recipes";
/********* */

// if(process.argv[2] === "production"){
//     var dbName = "production_recipes";
// } else{
//     var dbName = "sample_recipes";
// }




app.use("/recipes", async function(request, response, next){
    try {
        if(!client.isConnected()){
            console.log("[MongoDB connection] Starting connection...");
            await client.connect();
            console.log("[MongoDB connection] SUCCESS");
        }

        request.dbCollection = client.db(dbName).collection(collection);
        next();

    } catch (error) {
        response.status(500);
    }
    
   
}, recipe_routes);




module.exports = app;








