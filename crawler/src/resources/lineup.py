from resources.base import BaseResource
from const.models import LINEUP
from scrapers.mlb.lineup import MlbLineupScraper


class LineupResource(BaseResource):
    def __init__(self):
        self.resource_type = LINEUP
        self.mlb_keys = ["date"]
        self.mlb_scraper = MlbLineupScraper()
