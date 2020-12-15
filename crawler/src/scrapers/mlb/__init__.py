from const.models import TEAM, PLAYER, GAME, STAT
from .teams import MlbTeamsScraper
from .players import MlbPlayersScraper
from .games import MlbGamesScraper
from .stats import MlbStatsScraper


class MlbScraperFactory:
    def __init__(self, resource_type):
        self.resource_type = resource_type

    def get_scraper(self):
        if self.resource_type == TEAM:
            return MlbTeamsScraper()
        if self.resource_type == PLAYER:
            return MlbPlayersScraper()
        if self.resource_type == GAME:
            return MlbGamesScraper()
        if self.resource_type == STAT:
            return MlbStatsScraper()
