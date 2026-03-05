from v2.scrapers.base import BaseScraper


def _parse_hour(text):
    colon = text.index(":")
    hour = 0 if text[:colon].strip() == "12" else int(text[:colon])
    return hour + 12 if "pm" in text else hour


def _strip_unit(text):
    return text.split(" ")[0]


class ForecastScraper(BaseScraper):
    def parse_data(self):
        self.wait_for("#hourly-forecast-table")
        rows = self.table_rows("#hourly-forecast-table")
        return {"forecasts": [self._parse_row(row) for row in rows]}

    def _parse_row(self, row):
        text = [c.text for c in row]
        return {
            "hour": _parse_hour(text[0]),
            "conditions": text[1],
            "temp": int(_strip_unit(text[2])),
            "dew": int(_strip_unit(text[7])),
            "humidity": int(_strip_unit(text[8])),
            "wind": text[9],
            "pressure": float(_strip_unit(text[10])),
        }
