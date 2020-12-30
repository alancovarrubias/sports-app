from flask_restful import reqparse
from const.models import TEAM, PLAYER, GAME, STAT, LINE

parsers = {}
parser = reqparse.RequestParser()
parser.add_argument("sport", type=str, location="args", required=True)
team_parser = parser.copy()
team_parser.add_argument("season", type=int, location="args", required=True)
parsers[TEAM] = team_parser

player_parser = parser.copy()
player_parser.add_argument("season", type=int, location="args", required=True)
player_parser.add_argument("team", type=str, location="args", required=True)
parsers[PLAYER] = player_parser

game_parser = parser.copy()
game_parser.add_argument("season", type=int, location="args", required=True)
game_parser.add_argument("teams", type=str, location="args")
parsers[GAME] = game_parser

stat_parser = parser.copy()
stat_parser.add_argument("game_url", type=str, location="args", required=True)
stat_parser.add_argument("away_team", type=str, location="args", required=True)
stat_parser.add_argument("home_team", type=str, location="args", required=True)
parsers[STAT] = stat_parser

line_parser = parser.copy()
line_parser.add_argument("date", type=str, location="args", required=True)
parsers[LINE] = line_parser