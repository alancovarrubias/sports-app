from const.models import TEAM, PLAYER, GAME, STAT
from .teams import NbaTeamsScraper
from .players import NbaPlayersScraper
from .games import NbaGamesScraper
from .stats import NbaStatsScraper


class NbaScraperFactory:
    def get_scraper(self, key_store):
        resource_type = key_store.resource_type
        if resource_type == TEAM:
            return NbaTeamsScraper(key_store)
        if resource_type == PLAYER:
            return NbaPlayersScraper(key_store)
        if resource_type == GAME:
            return NbaGamesScraper(key_store)
        if resource_type == STAT:
            return NbaStatsScraper(key_store)
