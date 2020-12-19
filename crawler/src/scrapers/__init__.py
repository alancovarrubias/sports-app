from const.sports import NBA, MLB
from const.models import TEAM, PLAYER, GAME, STAT, LINE

from scrapers.nba.team import NbaTeamScraper
from scrapers.nba.player import NbaPlayerScraper
from scrapers.nba.game import NbaGameScraper
from scrapers.nba.stat import NbaStatScraper
from scrapers.nba.line import NbaLineScraper

from scrapers.mlb.team import MlbTeamScraper
from scrapers.mlb.player import MlbPlayerScraper
from scrapers.mlb.game import MlbGameScraper
from scrapers.mlb.stat import MlbStatScraper
from scrapers.mlb.line import MlbLineScraper

NbaScrapers = {
    TEAM: NbaTeamScraper,
    PLAYER: NbaPlayerScraper,
    GAME: NbaGameScraper,
    STAT: NbaStatScraper,
    LINE: NbaLineScraper,
}

MlbScrapers = {
    TEAM: MlbTeamScraper,
    PLAYER: MlbPlayerScraper,
    GAME: MlbGameScraper,
    STAT: MlbStatScraper,
    LINE: MlbLineScraper,
}

SportScrapers = {
    NBA: NbaScrapers,
    MLB: MlbScrapers,
}

class ScraperFactory:
    def __init__(self, args):
        self.scraper = SportScrapers[args.sport][args.resource_type]

    def get_scraper(self):
        return self.scraper()
