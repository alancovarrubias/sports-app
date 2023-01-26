from resources.base import BaseResource
from scrapers.nba.line import NbaLineScraper
from scrapers.mlb.line import MlbLineScraper
from const.models import LINE


class LineResource(BaseResource):
    def __init__(self):
        self.resource_type = LINE
        self.nba_keys = ["date"]
        self.nba_scraper = NbaLineScraper()
        self.mlb_keys = ["date"]
        self.mlb_scraper = MlbLineScraper()
