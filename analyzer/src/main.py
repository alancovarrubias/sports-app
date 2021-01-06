from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
for string_parameter in [
    "sport",
    "team",
    "teams",
    "game_url",
    "away_team",
    "home_team",
]:
    parser.add_argument(string_parameter, type=str, location="args")
parser.add_argument("season", type=int, location="args")


def fetch_resource():
    return "hey"


class TeamResources(Resource):
    def get(self):
        return fetch_resource()


api.add_resource(TeamResources, "/teams")

if __name__ == "__main__":
    app.run(host="0.0.0.0")
