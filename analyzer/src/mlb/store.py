from mlb.model import MlbModel


class MlbStore:
    def __init__(self):
        self.store = {}

    def get_data(self):
        json_data = {k: v.toJson() for k, v in self.store.items()}
        return json_data

    def add_data(self, data):
        key = self.build_key(data)
        if key not in self.store:
            self.store[key] = MlbModel()
        self.store[key].add_data(data)

    def build_key(self, data):
        stat = data["stat"]
        model = stat["batting"] if stat["batting"] else stat["pitching"]
        return model["model_type"] + str(data["id"])