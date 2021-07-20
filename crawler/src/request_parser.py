from flask_restful import reqparse
from const.models import TEAM, PLAYER, GAME, STAT, ADVANCED_STAT, LINE, MATCHUP, LINEUP, WEATHER

parsers = {}
parser = reqparse.RequestParser()
parser.add_argument("sport", type=str, location="args", required=True)
parser.add_argument("refetch", type=int, location="args")
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

stat_parser = parser.copy()
stat_parser.add_argument("season", type=int, location="args", required=True)
stat_parser.add_argument("team", type=str, location="args", required=True)
parsers[ADVANCED_STAT] = stat_parser

line_parser = parser.copy()
line_parser.add_argument("date", type=str, location="args", required=True)
parsers[LINE] = line_parser
parsers[MATCHUP] = line_parser
parsers[LINEUP] = line_parser

weather_parser = parser.copy()
weather_parser.add_argument("team", type=str, location="args", required=True)
weather_parser.add_argument("start_date", type=str, location="args", required=True)
weather_parser.add_argument("end_date", type=str, location="args", required=True)
parsers[WEATHER] = weather_parser