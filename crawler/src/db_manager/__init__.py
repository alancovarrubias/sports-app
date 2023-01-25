from pymongo import MongoClient
from const.models import STAT
from bson.json_util import dumps, loads

client = MongoClient("mongodb://mongo:27017/")


class DbManager:
    def __init__(self, sport, resource_type):
        self.collection = client[sport][resource_type]

    def fetch_resource(self, key):
        resource = self.collection.find_one({"key": key})
        json = loads(dumps(resource))
        json.pop("_id", None)
        json.pop("key", None)
        return json

    def save_resource(self, key, data):
        data["key"] = key
        self.collection.insert_one(data)

    def delete_resource(self, key):
        self.collection.find_one_and_delete({"key": key})

    def update_resource_field(self, key, field, data):
        self.collection.update_one({"key": key}, {"$set": {field: data}}, upsert=False)

    def remove_resource_field(self, key, field):
        self.collection.update_one({"key": key}, {"$unset": {field: 1}})

    def resource_exists(self, key):
        resource = self.collection.find_one({"key": key})
        return resource is not None

    def missing_field(self, key, field):
        resource = self.fetch_resource(key)
        return field not in resource.keys()
