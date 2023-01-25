from flask import Flask
from flask_restful import Api
from resources import *

app = Flask(__name__)
api = Api(app)

api.add_resource(TeamResource, "/teams")
api.add_resource(PlayerResource, "/players")
api.add_resource(GameResource, "/games")
api.add_resource(StatResource, "/stats")
api.add_resource(AdvancedStatResource, "/advanced_stats")
api.add_resource(LineResource, "/lines")
api.add_resource(MatchupResource, "/matchups")
api.add_resource(LineupResource, "/lineups")
api.add_resource(WeatherResource, "/weathers")
api.add_resource(ForecastResource, "/forecasts")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
