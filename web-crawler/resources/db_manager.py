from pymongo import MongoClient
from bson.json_util import dumps, loads

client = MongoClient('mongodb://localhost:27017/')


class DbManager:
    def __init__(self, key_store):
        self.collection = client[key_store.sport][key_store.resource_type]
        self.db_key = key_store.db_key

    def fetch_resource(self):
        resource = self.collection.find_one({'key': self.db_key})
        json = loads(dumps(resource))
        json.pop('_id', None)
        json.pop('key', None)
        return json

    def save_resource(self, data):
        data['key'] = self.db_key
        self.collection.insert_one(data)

    def resource_exists(self):
        resource = self.collection.find_one({'key': self.db_key})
        return resource is not None
