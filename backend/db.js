
const config = require("./config");

const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://" + config.MONGO_USERNAME +":" + config.MONGO_PW + "@cluster0.ugps3.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

async function initialize(dbName, dbCollectionName, app){
    try{
        let dbInstance = await MongoClient.connect(dbConnectionUrl, {useUnifiedTopology : true});
        const dbObject = dbInstance.db(dbName);
        const dbCollection = dbObject.collection(dbCollectionName);
        console.log("[MongoDB connection] SUCCESS");
        
        app.emit("dbConnected");
        app.dbConnected = true;

        return dbCollection;
    }
    catch{
        console.log(`[MongoDB connection] ERROR: ${err}`);
        return null;
    }
}

module.exports = {
    initialize
};