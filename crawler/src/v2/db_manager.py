import os
from pymongo import MongoClient
from bson.json_util import dumps, loads

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://mongo:27017/")
client = MongoClient(MONGO_URI)


class DbManager:
    def __init__(self, sport, resource_type):
        self.collection = client[sport][resource_type]

    def fetch_resource(self, key):
        resource = self.collection.find_one({"key": key})
        if resource is None:
            return None
        json = loads(dumps(resource))
        json.pop("_id", None)
        json.pop("key", None)
        return json

    def save_resource(self, key, data):
        data["key"] = key
        self.collection.insert_one(data)

    def delete_resource(self, key):
        self.collection.find_one_and_delete({"key": key})

    def resource_exists(self, key):
        resource = self.collection.find_one({"key": key})
        return resource is not None
