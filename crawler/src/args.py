from const.sports import NBA, MLB, SPORTS
from const.models import TEAM, PLAYER, GAME, STAT, LINE
from request_parser import parsers

KEYS = {
    NBA: {
        TEAM: ["sport", "season"],
        PLAYER: ["sport", "season", "team"],
        GAME: ["sport", "season"],
        STAT: ["sport", "game_url"],
        LINE: ["sport", "season", "date"],
    },
    MLB: {
        TEAM: ["sport", "season"],
        PLAYER: ["sport", "season", "team"],
        GAME: ["sport", "season"],
        STAT: ["sport", "game_url"],
    },
}


class Args:
    def __init__(self, resource_type):
        self.resource_type = resource_type
        self.query_params = parsers[self.resource_type].parse_args()
        self.sport = self.query_params["sport"]
        self.keys = KEYS[self.sport][self.resource_type]
        self.values = [str(self.query_params[key]) for key in self.keys]
        self.db_key = "".join(self.values[1:])

    def validate(self):
        if self.sport is None or self.sport not in SPORTS:
            return False, "Missing sports argument"
        for key in self.keys:
            if key not in self.query_params.keys():
                return False, f"Required arguments {self.keys}"
        return True, None
