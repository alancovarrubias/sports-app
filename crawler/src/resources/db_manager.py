from pymongo import MongoClient
from bson.json_util import dumps, loads

client = MongoClient("mongodb://mongo:27017/")


class DbManager:
    def __init__(self, args):
        self.collection = client[args.sport][args.resource_type]

    def fetch_resource(self, key):
        resource = self.collection.find_one({"key": key})
        json = loads(dumps(resource))
        json.pop("_id", None)
        json.pop("key", None)
        return json

    def save_resource(self, key, data):
        data["key"] = key
        self.collection.insert_one(data)

    def resource_exists(self, key):
        resource = self.collection.find_one({"key": key})
        return resource is not None
