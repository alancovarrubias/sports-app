from resources.base import BaseResource
from const.models import LINE
from scrapers.nba.line import NbaLineScraper
from scrapers.mlb.line import MlbLineScraper

class LineResource(BaseResource):
    def __init__(self):
        self.resource_type = LINE
        self.keys = ["date"]
        self.nba_scraper = NbaLineScraper
        self.mlb_scraper = MlbLineScraper