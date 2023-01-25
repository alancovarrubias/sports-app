from resources.base import BaseResource
from const.models import TEAM
from scrapers.nba.team import NbaTeamScraper
from scrapers.mlb.team import MlbTeamScraper

class TeamResource(BaseResource):
    def __init__(self):
        self.resource_type = TEAM
        self.keys = ["season"]
        self.nba_scraper = NbaTeamScraper
        self.mlb_scraper = MlbTeamScraper