from const.models import TEAM, PLAYER, GAME, STAT
from .teams import MlbTeamsScraper
from .players import MlbPlayersScraper
from .games import MlbGamesScraper
from .stats import MlbStatsScraper


class MlbScraperFactory:
    def get_scraper(self, key_store):
        resource_type = key_store.resource_type
        if resource_type == TEAM:
            return MlbTeamsScraper(key_store)
        if resource_type == PLAYER:
            return MlbPlayersScraper(key_store)
        if resource_type == GAME:
            return MlbGamesScraper(key_store)
        if resource_type == STAT:
            return MlbStatsScraper(key_store)
