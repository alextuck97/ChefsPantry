const app = require("./app");
const config = require("./config");

const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://" + config.MONGO_USERNAME +":" + config.MONGO_PW + "@cluster0.ugps3.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

function initialize(dbName, dbCollectionName, successCallback, failureCallback){
    MongoClient.connect(dbConnectionUrl, {useUnifiedTopology : true}).then(
        function(dbInstance){
            
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
            
        }
    )
    .catch(function(err) {
        console.log(`[MongoDB connection] ERROR: ${err}`);
        failureCallback(err);
    })
}

module.exports = {
    initialize
};