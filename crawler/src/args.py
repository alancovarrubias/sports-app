from const.sports import NBA, MLB, SPORTS
from const.models import TEAM, PLAYER, GAME, STAT, LINE
from request_parser import parsers

KEYS = {
    NBA: {
        TEAM: ["season"],
        PLAYER: ["season", "team"],
        GAME: ["season"],
        STAT: ["game_url"],
        LINE: ["season", "date"],
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
        self.keys = KEYS[self.sport][resource_type]
        self.values = [str(self.query_params[key]) for key in self.keys]
        self.db_key = self.sport + "".join(self.values)

    def validate(self):
        if self.sport is None or self.sport not in SPORTS:
            return False, "Missing sports argument"
        for key in self.keys:
            if key not in self.query_params.keys():
                return False, f"Required arguments {self.keys}"
        return True, None
