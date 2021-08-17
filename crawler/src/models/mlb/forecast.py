import json
from datetime import datetime, timedelta
from helpers.datetime import DATETIME_FORMAT


def parse_hour(cell):
    time_text = cell.text
    colon_index = time_text.index(":")
    hour_text = time_text[0:colon_index]
    hour = 0 if hour_text == "12" else int(hour_text)
    if "pm" in time_text:
        hour += 12
    return hour


def convert_temp(cell):
    return int(cell.text.split(" ")[0])


def convert_pressure(cell):
    return float(cell.text.split(" ")[0])


class MlbForecast:
    def __init__(self, row, date):
        hour = parse_hour(row[0])
        time = datetime.combine(date, datetime.min.time()) + timedelta(hours=hour)
        self.hour = hour
        self.local_time = time.strftime(DATETIME_FORMAT)
        self.conditions = row[1].text
        self.temp = convert_temp(row[2])
        self.dew = convert_temp(row[7])
        self.humidity = convert_temp(row[8])
        self.wind = row[9].text
        self.pressure = convert_pressure(row[10])

    def toJson(self):
        json_string = json.dumps(self, default=lambda o: o.__dict__)
        return json.loads(json_string)