from const.sports import NBA, MLB, SPORTS
from const.models import TEAM, PLAYER, GAME, STAT, LINE
from request_parser import parsers

DB_KEYS = {
    NBA: {
        TEAM: ["season"],
        PLAYER: ["season", "team"],
        GAME: ["season"],
        STAT: ["game_url"],
        LINE: ["date"],
    },
    MLB: {
        TEAM: ["season"],
        PLAYER: ["season", "team"],
        GAME: ["season"],
        STAT: ["game_url"],
    },
}


class Args:
    def __init__(self, resource_type):
        self.resource_type = resource_type
        self.query_params = parsers[resource_type].parse_args()
        self.sport = self.query_params["sport"]
        keys = DB_KEYS[self.sport][resource_type]
        values = [str(self.query_params[key]) for key in keys]
        self.db_key = "".join(values)
