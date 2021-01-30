from data.stat import DataStat


class DataStore:
    def __init__(self, previous_size=1):
        self.teams = {}
        self.players = {}
        self.previous_size = previous_size

    def add_data(self, model):
        model_stat = DataStat(model, self.previous_size)
        model_map = self.get_data_map(model_stat)
        if model_stat.id not in model_map:
            model_map[model_stat.id] = model_stat
        else:
            model_map[model_stat.id].add_model(model)

    def get_data(self, model):
        model_stat = DataStat(model, self.previous_size)
        model_map = self.get_data_map(model_stat)
        if model_stat.id not in model_map:
            return None
        return model_map[model_stat.id]

    def get_data_map(self, model_stat):
        return self.teams if model_stat.model_type == "Team" else self.players