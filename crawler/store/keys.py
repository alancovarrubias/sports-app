from const.sports import NBA, MLB, SPORTS
from const.models import TEAM, PLAYER, GAME, STAT

KEYS = {
    NBA: {
        TEAM: ['sport', 'season'],
        PLAYER: ['sport', 'season', 'team'],
        GAME: ['sport', 'season'],
        STAT: ['sport', 'game_url']
    },
    MLB: {
        TEAM: ['sport', 'season'],
        PLAYER: ['sport', 'season', 'team'],
        GAME: ['sport', 'season'],
        STAT: ['sport', 'game_url']
    }
}


class KeyStore:
    def __init__(self, resource_type, args):
        self.args = {k: v for k, v in args.items() if v is not None}
        self.sport = self.args['sport']
        self.resource_type = resource_type
        self.keys, self.values = self.key_values()
        self.valid, self.error_message = self.validate_args()
        self.db_key = self.build_db_key()

    def validate_args(self):
        if self.sport is None or self.sport not in SPORTS:
            return False, 'Missing sports argument'
        for key in self.keys:
            if key not in self.args.keys():
                return False, f'Required arguments {self.keys}'
        return True, None

    def key_values(self):
        keys = KEYS[self.sport][self.resource_type]
        values = list(map(lambda key: str(self.args[key]), keys))
        return keys, values

    def build_db_key(self):
        return ''.join(self.values[1:])
