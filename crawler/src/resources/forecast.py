from resources.base import BaseResource
from const.models import FORECAST
from scrapers.mlb.forecast import MlbForecastScraper

class ForecastResource(BaseResource):
    def __init__(self):
        self.resource_type = FORECAST
        self.keys = ["team", "game_time", "hour"]
        self.mlb_scraper = MlbForecastScraper