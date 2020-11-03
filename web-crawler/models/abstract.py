from abc import ABC, abstractmethod
import json

class AbstractModel(ABC):
    def __init__(self, row):
        self.build(row)

    @abstractmethod
    def build(self, row):
        pass

    def toJson(self):
        json_string = json.dumps(self, default=lambda o: o.__dict__)
        return json.loads(json_string)
