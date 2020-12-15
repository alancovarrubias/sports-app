from const.sports import NBA, MLB
from scrapers.nba import NbaScraperFactory
from scrapers.mlb import MlbScraperFactory


class ScraperFactory:
    def __init__(self, args):
        self.sport = args.sport
        self.resource_type = args.resource_type

    def get_scraper(self):
        if self.sport == NBA:
            return NbaScraperFactory(self.resource_type).get_scraper()
        elif self.sport == MLB:
            return MlbScraperFactory(self.resource_type).get_scraper()
