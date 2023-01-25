from flask_restful import reqparse

ARG_TYPES = {
    "season": int,
    "team": str,
    "game_url": str,
    "away_team": str,
    "home_team": str,
    "date": str,
    "lat": float,
    "lng": float,
    "start_date": str,
    "end_date": str,
    "hour": int,
    "game_time": str,
}

class Args:
    def __init__(self, keys):
        self.query_params = self.parse_query_params(keys)
        self.sport = self.query_params["sport"]
        self.refetch = self.query_params["refetch"]
        self.db_key = self.create_db_key(keys)

    def create_db_key(self, keys):
        values = [str(self.query_params[key]) for key in keys]
        return "".join(values)

    def parse_query_params(self, keys):
        parser = reqparse.RequestParser()
        parser.add_argument("refetch", type=int, location="args")
        parser.add_argument("sport", type=str, location="args", required=True)
        for key in keys:
            parser.add_argument(key, type=ARG_TYPES[key], location="args", required=True)
        return parser.parse_args()

