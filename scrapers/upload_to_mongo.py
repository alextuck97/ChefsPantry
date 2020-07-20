import config
import pymongo
import json
import os


def upload_files(files):

    for f in files:
        with open(f, "r") as text:
            lines = text.readlines()
            docs = [json.loads(l) for l in lines]
            col.insert_many(docs)

if __name__ == "__main__":

    uri = "mongodb+srv://" + config.MONGO_USERNAME + ":" + config.MONGO_PW + "@cluster0.ugps3.mongodb.net/sample_recipe?retryWrites=true&w=majority"

    client = pymongo.MongoClient(uri)
    db = client["production_recipes"]
    col = db["recipes"]

    d = "processed_jsons/processed_jsons/"
    filenames = [d + f for f in os.listdir(d)]
    #file_names = ["processed_jsons/processed_jsons/wholesomedish.txt"]

    upload_files(filenames)