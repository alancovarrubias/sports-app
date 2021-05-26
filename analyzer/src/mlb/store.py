from mlb.model import MlbModel


class MlbStore:
    def __init__(self):
        self.store = {}

    def add_data(self, model):
        model = MlbModel(model)
        if model.key in self.store:
            self.store[model.key].add_model(model)
        else:
            self.store[model.key] = model

    def get_data(self, model):
        model = MlbModel(model)
        if model.key in self.store:
            return self.store[model.key]
