from scrapers.wunderground import WundergroundScraper
from models.mlb.forecast import MlbForecast
from helpers.timezones import get_timezone
from helpers.wunderground import get_team_endpoint
from datetime import datetime, timedelta
import pytz
from helpers.datetime import DATE_FORMAT, DATETIME_FORMAT


GAME_LENGTH = 4


class MlbForecastScraper(WundergroundScraper):
    def get_resource(self, args):
        team = args["team"]
        timezone = get_timezone(team)
        query_time = pytz.utc.localize(datetime.now())
        game_time = datetime.strptime(args["game_time"], DATETIME_FORMAT)
        local_game_time = timezone.localize(game_time)
        local_query_time = query_time.astimezone(timezone)
        forecasts = self.get_forecasts(local_query_time, local_game_time, team)
        return {
            "forecasts": forecasts,
            "query_time": query_time.strftime(DATETIME_FORMAT),
        }

    def get_forecasts(self, query_time, game_time, team):
        forecasts = []
        date = (query_time + timedelta(hours=1)).date()
        game_end = game_time + timedelta(hours=GAME_LENGTH)
        while date <= game_end.date():
            forecasts += self.get_date_forecasts(team, date, game_end)
            for forecast in forecasts:
                forecast["date"] = date.strftime(DATE_FORMAT)
            date += timedelta(days=1)
        return forecasts

    def get_date_forecasts(self, team, date, game_end):
        team_endpoint = get_team_endpoint(team)
        endpoint = f"hourly/{team_endpoint}/date/{date.strftime(DATE_FORMAT)}"
        self.get(endpoint)
        self.driver.implicitly_wait(15)
        forecast_table = self.find_element("#hourly-forecast-table")
        forecast_rows = self.get_table_rows(forecast_table)
        forecasts = [MlbForecast(row) for row in forecast_rows]
        return [
            forecast.toJson()
            for forecast in forecasts
            if date < game_end.date() or forecast.hour <= game_end.hour
        ]