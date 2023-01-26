from resources.base import BaseResource
from const.models import MATCHUP
from scrapers.mlb.matchup import MlbMatchupScraper


class MatchupResource(BaseResource):
    def __init__(self):
        self.resource_type = MATCHUP
        self.mlb_keys = ["date"]
        self.mlb_scraper = MlbMatchupScraper()
