from scrapers.wunderground import WundergroundScraper
from models.mlb.forecast import MlbForecast


class MlbForecastScraper(WundergroundScraper):
    def get_resource(self, args):
        endpoint = f"hourly/us/oh/cleveland/44115"
        self.get(endpoint)
        self.driver.implicitly_wait(15)
        forecast_table = self.find_element("#hourly-forecast-table")
        forecast_rows = self.get_table_rows(forecast_table)
        forecasts = [MlbForecast(row).toJson() for row in forecast_rows]
        return {"forecasts": forecasts}
