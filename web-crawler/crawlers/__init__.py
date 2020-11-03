from const.sports import NBA, MLB
from crawlers.nba import NbaScraperFactory
from crawlers.mlb import MlbScraperFactory


class ScraperFactory:
    def get_scraper(self, key_store):
        sport = key_store.sport
        if sport == NBA:
            return NbaScraperFactory().get_scraper(key_store)
        elif sport == MLB:
            return MlbScraperFactory().get_scraper(key_store)
    
