from resources.base import BaseResource
from const.models import WEATHER
from scrapers.mlb.weather import MlbWeatherScraper

class WeatherResource(BaseResource):
    def __init__(self):
        self.resource_type = WEATHER
        self.keys = ["lat", "lng", "start_date", "end_date"]
        self.mlb_scraper = MlbWeatherScraper