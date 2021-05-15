from flask import Flask
from flask_restful import Api, Resource
from const.models import TEAM, PLAYER, GAME, STAT, LINE, MATCHUP, LINEUP
from db_manager import DbManager
from scrapers import get_scraper
from args import Args

app = Flask(__name__)
api = Api(app)

def fetch_resource(resource_type):
    args = Args(resource_type)
    db_manager = DbManager(args)
    scraper = get_scraper(args)
    if not db_manager.resource_exists(args.db_key):
        resource_data = scraper.get_resource(args.query_params)
        scraper.driver.quit()
        db_manager.save_resource(args.db_key, resource_data)
    else:
        if resource_type == STAT:
            field = "time"
            if db_manager.missing_field(args.db_key, field):
                resource_data = scraper.get_missing(args.query_params)
                scraper.driver.quit()
                db_manager.update_resource_field(
                    args.db_key, field, resource_data[field]
                )
                field = "plays"
                db_manager.update_resource_field(
                    args.db_key, field, resource_data[field]
                )
    return db_manager.fetch_resource(args.db_key)


class TeamResources(Resource):
    def get(self):
        return fetch_resource(TEAM)


class PlayerResources(Resource):
    def get(self):
        return fetch_resource(PLAYER)


class GameResources(Resource):
    def get(self):
        return fetch_resource(GAME)


class StatResources(Resource):
    def get(self):
        return fetch_resource(STAT)


class LineResources(Resource):
    def get(self):
        return fetch_resource(LINE)

class MatchupResources(Resource):
    def get(self):
        return fetch_resource(MATCHUP)

class LineupResources(Resource):
    def get(self):
        return fetch_resource(LINEUP)

api.add_resource(TeamResources, "/teams")
api.add_resource(PlayerResources, "/players")
api.add_resource(GameResources, "/games")
api.add_resource(StatResources, "/stats")
api.add_resource(LineResources, "/lines")
api.add_resource(MatchupResources, "/matchups")
api.add_resource(LineupResources, "/lineups")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
