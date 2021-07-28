from models.abstract import AbstractModel


class MlbForecast(AbstractModel):
    def build(self, row):
        self.time = row[0].text
        self.conditions = row[1].text
        self.temp = row[2].text
        self.dew = row[7].text
        self.humidity = row[8].text
        self.wind = row[9].text
        self.pressure = row[10].text
