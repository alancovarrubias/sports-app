from scrapers.wunderground import WundergroundScraper
from models.mlb.forecast import MlbForecast
from helpers.timezones import get_timezone
from helpers.wunderground import get_team_endpoint
from datetime import datetime, timedelta
import pytz
from helpers.datetime import DATE_FORMAT, DATETIME_FORMAT


class MlbForecastScraper(WundergroundScraper):
    def get_resource(self, args):
        team = args["team"]
        game_time = args["game_time"]
        timezone = get_timezone(team)
        query_datetime = pytz.utc.localize(datetime.now())
        game_datetime = datetime.strptime(game_time, DATETIME_FORMAT)
        local_game_datetime = timezone.localize(game_datetime)
        local_query_datetime = query_datetime.astimezone(timezone)
        forecasts = self.get_forecasts(local_query_datetime, local_game_datetime, team)
        return {
            "forecasts": forecasts,
            "query_time": query_datetime.strftime(DATETIME_FORMAT),
        }

    def get_forecasts(self, query_datetime, game_datetime, team):
        forecasts = []
        current_date = query_datetime.date()
        game_end_datetime = game_datetime + timedelta(hours=4)
        while current_date <= game_end_datetime.date():
            forecasts += self.get_date_forecasts(team, current_date, game_end_datetime)
            current_date += timedelta(days=1)
        return forecasts

    def get_date_forecasts(self, team, current_date, game_end_datetime):
        team_endpoint = get_team_endpoint(team)
        endpoint = f"hourly/{team_endpoint}/date/{current_date.strftime(DATE_FORMAT)}"
        self.get(endpoint)
        self.driver.implicitly_wait(15)
        forecast_table = self.find_element("#hourly-forecast-table")
        forecast_rows = self.get_table_rows(forecast_table)
        forecasts = [MlbForecast(row, current_date) for row in forecast_rows]
        return [
            forecast.toJson()
            for forecast in forecasts
            if current_date < game_end_datetime.date()
            or forecast.hour <= game_end_datetime.hour
        ]