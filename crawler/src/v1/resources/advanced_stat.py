from resources.base import BaseResource
from const.models import ADVANCED_STAT
from scrapers.mlb.advanced_stat import MlbAdvancedStatScraper


class AdvancedStatResource(BaseResource):
    def __init__(self):
        self.resource_type = ADVANCED_STAT
        self.mlb_keys = ["season", "team"]
        self.mlb_scraper = MlbAdvancedStatScraper()
