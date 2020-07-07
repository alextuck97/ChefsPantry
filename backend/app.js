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

const db = require("./db");
const dbName = "sample_airbnb";
const collectionName = "listingsAndReviews";



db.initialize(dbName, collectionName, function(dbCollection) {

    app.get("/listing/:id", (request, response) => {
        const itemid = request.params.id;
        dbCollection.findOne({_id : itemid}).then((result) => {
            
            if(result === null){
                response.status(404);
            }

            response.json(result);
        })
        .catch((error) => {
            response.status(400);
            console.log(error);
        })
        
    })

    
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







