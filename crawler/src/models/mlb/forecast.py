from models.abstract import AbstractModel


def convert_temp(cell):
    return int(cell.text.split(" ")[0])


def convert_pressure(cell):
    return float(cell.text.split(" ")[0])


class MlbForecast(AbstractModel):
    def build(self, row):
        self.time = row[0].text
        self.conditions = row[1].text
        self.temp = convert_temp(row[2])
        self.dew = convert_temp(row[7])
        self.humidity = convert_temp(row[8])
        self.wind = row[9].text
        self.pressure = convert_pressure(row[10])
