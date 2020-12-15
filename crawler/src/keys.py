from const.sports import NBA, MLB, SPORTS
from const.models import TEAM, PLAYER, GAME, STAT

KEYS = {
    NBA: {
        TEAM: ["sport", "season"],
        PLAYER: ["sport", "season", "team"],
        GAME: ["sport", "season"],
        STAT: ["sport", "game_url"],
    },
    MLB: {
        TEAM: ["sport", "season"],
        PLAYER: ["sport", "season", "team"],
        GAME: ["sport", "season"],
        STAT: ["sport", "game_url"],
    },
}


class Keys:
    def __init__(self, resource_type, args):
        self.args = {k: v for k, v in args.items() if v is not None}
        self.sport = self.args["sport"]
        self.resource_type = resource_type
        self.keys = KEYS[self.sport][self.resource_type]
        self.values = [str(self.args[key]) for key in keys]
        self.db_key = "".join(self.values[1:])

    def validate_args(self):
        if self.sport is None or self.sport not in SPORTS:
            return False, "Missing sports argument"
        for key in self.keys:
            if key not in self.args.keys():
                return False, f"Required arguments {self.keys}"
        return True, None
