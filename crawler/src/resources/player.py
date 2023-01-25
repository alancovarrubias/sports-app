from resources.base import BaseResource
from const.models import PLAYER
from scrapers.nba.player import NbaPlayerScraper
from scrapers.mlb.player import MlbPlayerScraper

class PlayerResource(BaseResource):
    def __init__(self):
        self.resource_type = PLAYER
        self.keys = ["season", "team"]
        self.nba_scraper = NbaPlayerScraper
        self.mlb_scraper = MlbPlayerScraper