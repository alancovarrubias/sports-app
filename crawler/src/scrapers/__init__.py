from const.sports import NBA, MLB
from const.models import TEAM, PLAYER, GAME, STAT, LINE, MATCHUP, LINEUP

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
from scrapers.mlb.matchup import MlbMatchupScraper
from scrapers.mlb.lineup import MlbLineupScraper

SportScrapers = {
    NBA: {
        TEAM: NbaTeamScraper,
        PLAYER: NbaPlayerScraper,
        GAME: NbaGameScraper,
        STAT: NbaStatScraper,
        LINE: NbaLineScraper,
    },
    MLB: {
        TEAM: MlbTeamScraper,
        PLAYER: MlbPlayerScraper,
        GAME: MlbGameScraper,
        STAT: MlbStatScraper,
        LINE: MlbLineScraper,
        MATCHUP: MlbMatchupScraper,
        LINEUP: MlbLineupScraper,
    },
}


def get_scraper(args):
    return SportScrapers[args.sport][args.resource_type]()
