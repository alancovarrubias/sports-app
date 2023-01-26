from resources.base import BaseResource
from scrapers.nba.game import NbaGameScraper
from scrapers.mlb.game import MlbGameScraper
from scrapers.nfl.game import NflGameScraper
from const.models import GAME


class GameResource(BaseResource):
    def __init__(self):
        self.resource_type = GAME
        self.nba_keys = ["season", "team"]
        self.nba_scraper = NbaGameScraper()
        self.mlb_keys = ["season", "team"]
        self.mlb_scraper = MlbGameScraper()
        self.nfl_keys = ["season", "week", "season_type"]
        self.nfl_scraper = NflGameScraper()
