from resources.base import BaseResource
from const.models import GAME
from scrapers.nba.game import NbaGameScraper
from scrapers.mlb.game import MlbGameScraper

class GameResource(BaseResource):
    def __init__(self):
        self.resource_type = GAME
        self.keys = ["season", "team"]
        self.nba_scraper = NbaGameScraper
        self.mlb_scraper = MlbGameScraper