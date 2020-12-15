from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from const.models import TEAM, PLAYER, GAME, STAT, LINE
from resources import Resources
from keys import Keys
from request_parser import parsers

app = Flask(__name__)
api = Api(app)


def fetch_resource(resource_type):
    args = parsers[resource_type].parse_args()
    key_store = Keys(resource_type, args)
    valid, error_message = key_store.validate_args()
    if not valid:
        abort(404, message=error_message)
    resources = Resources(key_store)
    return resources.fetch()


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


api.add_resource(TeamResources, "/teams")
api.add_resource(PlayerResources, "/players")
api.add_resource(GameResources, "/games")
api.add_resource(StatResources, "/stats")
api.add_resource(LineResources, "/lines")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
