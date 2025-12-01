from resources.base import BaseResource
from scrapers.mlb.forecast import MlbForecastScraper
from const.models import FORECAST


class ForecastResource(BaseResource):
    def __init__(self):
        self.resource_type = FORECAST
        self.mlb_keys = ["team", "game_time", "hour"]
        self.mlb_scraper = MlbForecastScraper()
