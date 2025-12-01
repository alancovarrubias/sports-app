from flask_restful import Resource, reqparse
from db_manager import DbManager
from const.sports import MLB, NBA, NFL


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
    "season_type": int,
    "week": int,
}


class BaseResource(Resource):
    def get(self):
        sport, refetch = self.parse_common_args()
        keys = self.get_keys(sport)
        scraper = self.get_scraper(sport)
        query_params = self.parse_query_params(keys)
        db_key = self.create_db_key(keys, query_params)
        db_manager = DbManager(sport, self.resource_type)
        if refetch:
            db_manager.delete_resource(db_key)
        if not db_manager.resource_exists(db_key):
            resource = self.scrape_resource(scraper, query_params)
            db_manager.save_resource(db_key, resource)
        return db_manager.fetch_resource(db_key)

    def parse_common_args(self):
        parser = reqparse.RequestParser()
        parser.add_argument("refetch", type=int, location="args")
        parser.add_argument("sport", type=str, location="args", required=True)
        common_args = parser.parse_args()
        return common_args["sport"], common_args["refetch"]

    def scrape_resource(self, scraper, query_params):
        resource = scraper.get_resource(query_params)
        if scraper.driver:
            scraper.driver.quit()
        return resource

    def get_keys(self, sport):
        if sport == NBA:
            return self.nba_keys
        elif sport == MLB:
            return self.mlb_keys
        elif sport == NFL:
            return self.nfl_keys

    def get_scraper(self, sport):
        if sport == NBA:
            return self.nba_scraper
        elif sport == MLB:
            return self.mlb_scraper
        elif sport == NFL:
            return self.nfl_scraper

    def create_db_key(self, keys, query_params):
        values = [str(query_params[key]) for key in keys]
        return "".join(values)

    def parse_query_params(self, keys):
        parser = reqparse.RequestParser()
        for key in keys:
            parser.add_argument(
                key, type=ARG_TYPES[key], location="args", required=True
            )
        return parser.parse_args()
