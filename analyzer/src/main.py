from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import requests
import json
from analyzer import Analyzer
from helpers import read_json

app = Flask(__name__)
api = Api(app)


PREVIOUS_LENGTH = 10


def fetch_games(season_id):
    url = f"http://nba:3001/seasons/{season_id}/games?team=1&player=1"
    games_res = requests.get(url)
    return json.loads(games_res.text)["data"]


parser = reqparse.RequestParser()
parser.add_argument("sport", type=str, location="args")
parser.add_argument("season_id", type=int, location="args")


def analyze_resource():
    args = parser.parse_args()
    games = fetch_games(args["season_id"])
    analyzer = Analyzer(games, PREVIOUS_LENGTH)
    return analyzer.run()


class PredResources(Resource):
    def get(self):
        return analyze_resource()


api.add_resource(PredResources, "/preds")

if __name__ == "__main__":
    app.run(host="0.0.0.0")
