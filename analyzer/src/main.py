from flask import Flask
from flask_restful import reqparse, Api, Resource
import requests
import json
from analyzer import Analyzer
from season_stat import SeasonStat

app = Flask(__name__)
api = Api(app)


PREVIOUS_LENGTH = 10

HOSTS = {"MLB": "mlb:3002", "NBA": "nba:3001"}


def fetch_games(args):
    season_id = args["season_id"]
    sport = args["sport"]
    host = HOSTS[sport]
    url = f"http://{host}/seasons/{season_id}/games?team=1&player=1"
    games_res = requests.get(url)
    return json.loads(games_res.text)["data"]


parser = reqparse.RequestParser()
parser.add_argument("sport", type=str, location="args")
parser.add_argument("season_id", type=int, location="args")


def analyze_resource():
    args = parser.parse_args()
    games = fetch_games(args)
    analyzer = Analyzer(games, PREVIOUS_LENGTH)
    return analyzer.run()


def season_stats():
    args = parser.parse_args()
    games = fetch_games(args)
    season_stat = SeasonStat(games)
    return season_stat.run()


class SeasonStatResources(Resource):
    def get(self):
        return season_stats()


class PredResources(Resource):
    def get(self):
        return analyze_resource()


api.add_resource(PredResources, "/preds")
api.add_resource(SeasonStatResources, "/seasonstats")

if __name__ == "__main__":
    app.run(host="0.0.0.0")
