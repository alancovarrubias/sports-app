from resources.base import BaseResource
from const.models import STAT
from scrapers.nba.stat import NbaStatScraper
from scrapers.mlb.stat import MlbStatScraper


class StatResource(BaseResource):
    def __init__(self):
        self.resource_type = STAT
        self.nba_keys = ["game_url"]
        self.nba_scraper = NbaStatScraper()
        self.mlb_keys = ["game_url"]
        self.mlb_scraper = MlbStatScraper()
