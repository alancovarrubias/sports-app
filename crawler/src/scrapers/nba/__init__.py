from const.models import TEAM, PLAYER, GAME, STAT, LINE
from .team import NbaTeamScraper
from .player import NbaPlayerScraper
from .game import NbaGameScraper
from .stat import NbaStatScraper
from .line import NbaLineScraper


class NbaScraperFactory:
    def __init__(self, resource_type):
        self.resource_type = resource_type

    def get_scraper(self):
        if self.resource_type == TEAM:
            return NbaTeamScraper()
        if self.resource_type == PLAYER:
            return NbaPlayerScraper()
        if self.resource_type == GAME:
            return NbaGameScraper()
        if self.resource_type == STAT:
            return NbaStatScraper()
        if self.resource_type == LINE:
            return NbaLineScraper()
