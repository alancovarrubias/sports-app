from flask import Blueprint, request

import v2.routes as routes
from v2.scrapers.mlb.teams import TeamsScraper
from v2.scrapers.mlb.players import PlayersScraper
from v2.scrapers.mlb.games import GamesScraper
from v2.scrapers.mlb.stats import StatsScraper
from v2.scrapers.mlb.lineups import LineupsScraper
from v2.scrapers.mlb.forecast import ForecastScraper
from v2.scrapers.mlb.matchups import MatchupsScraper
from v2.scrapers.mlb.lines import LinesScraper
from v2.scrapers.mlb.advanced_stats import (
    fetch_advanced_stats,
    BAT_FULL, BAT_HANDED, PIT_FULL, PIT_HANDED, PIT_LAST_30,
)
from v2.scrapers.mlb.weather import fetch_weather
from v2.url_builders.baseball_reference import BaseballReferenceUrlBuilder
from v2.url_builders.baseball_press import BaseballPressUrlBuilder
from v2.url_builders.wunderground import WundergroundUrlBuilder
from v2.url_builders.fangraphs import FangraphsUrlBuilder
from v2.url_builders.weather_api import WeatherApiUrlBuilder
from v2.url_builders.espn import EspnUrlBuilder
from v2.url_builders.scores_and_odds import ScoresAndOddsUrlBuilder

bp = Blueprint("mlb", __name__, url_prefix="/api/mlb")
mbr = BaseballReferenceUrlBuilder()

FANGRAPHS_SPECS = {
    "batting_full_season": BAT_FULL,
    "batting_vs_left": BAT_HANDED,
    "batting_vs_right": BAT_HANDED,
    "batting_last_14": BAT_HANDED,
    "pitching_full_season": PIT_FULL,
    "pitching_vs_left": PIT_HANDED,
    "pitching_vs_right": PIT_HANDED,
    "pitching_last_30": PIT_LAST_30,
}


@bp.route("/teams", methods=["GET"])
def teams():
    season = request.args.get("season", type=int)
    return routes.scrape_url(
        TeamsScraper, mbr.teams(season),
        sport="mlb", resource_type="teams", cache_key=str(season)
    )


@bp.route("/teams/<team>/players", methods=["GET"])
def players(team):
    season = request.args.get("season", type=int)
    return routes.scrape_url(
        PlayersScraper, mbr.players(team, season),
        sport="mlb", resource_type="players", cache_key=f"{team}{season}"
    )


@bp.route("/teams/<team>/games", methods=["GET"])
def games(team):
    season = request.args.get("season", type=int)
    return routes.scrape_url(
        GamesScraper, mbr.games(team, season),
        sport="mlb", resource_type="games", cache_key=f"{team}{season}"
    )


@bp.route("/games/<game_url>/stats", methods=["GET"])
def stats(game_url):
    return routes.scrape_url(
        StatsScraper, mbr.boxscore(game_url),
        sport="mlb", resource_type="stats", cache_key=game_url
    )


@bp.route("/lineups", methods=["GET"])
def lineups():
    date = request.args.get("date", type=str)
    url = BaseballPressUrlBuilder().lineups(date)
    return routes.scrape_url(
        LineupsScraper, url,
        sport="mlb", resource_type="lineups", cache_key=date
    )


@bp.route("/teams/<team>/forecast", methods=["GET"])
def forecast(team):
    date = request.args.get("date", type=str)
    url = WundergroundUrlBuilder().hourly(team, date)
    return routes.scrape_url(
        ForecastScraper, url,
        sport="mlb", resource_type="forecast", cache_key=f"{team}{date}"
    )


@bp.route("/weather", methods=["GET"])
def weather():
    url = WeatherApiUrlBuilder().historical(
        request.args.get("lat", type=float),
        request.args.get("lng", type=float),
        request.args.get("start_date", type=str),
        request.args.get("end_date", type=str),
    )
    return fetch_weather(url)


@bp.route("/teams/<team>/advanced_stats/<split>", methods=["GET"])
def advanced_stats(team, split):
    season = request.args.get("season", type=int)
    builder = FangraphsUrlBuilder(team, season)
    url = getattr(builder, split)()
    return fetch_advanced_stats(url, FANGRAPHS_SPECS[split])


@bp.route("/matchups", methods=["GET"])
def matchups():
    date = request.args.get("date", type=str)
    url = EspnUrlBuilder("mlb").schedule(date=date)
    return routes.scrape_url(
        MatchupsScraper, url,
        sport="mlb", resource_type="matchups", cache_key=date
    )


@bp.route("/lines", methods=["GET"])
def lines():
    date = request.args.get("date", type=str)
    url = ScoresAndOddsUrlBuilder("mlb").lines(date=date)
    return routes.scrape_url(
        LinesScraper, url,
        sport="mlb", resource_type="lines", cache_key=date
    )
