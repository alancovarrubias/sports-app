from flask import Blueprint, request

import v2.routes as routes
from v2.scrapers.nfl.play_by_play import PlayByPlayScraper
from v2.scrapers.nfl.boxscore import BoxscoreScraper
from v2.scrapers.nfl.gamecast import GamecastScraper
from v2.scrapers.nfl.schedule import ScheduleScraper
from v2.scrapers.nfl.lines import LinesScraper
from v2.url_builders.espn import EspnUrlBuilder
from v2.url_builders.scores_and_odds import ScoresAndOddsUrlBuilder

bp = Blueprint("football", __name__, url_prefix="/api/football")


@bp.route("/lines", methods=["GET"])
def lines():
    league = request.args.get("league", default="nfl", type=str)
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)
    url = ScoresAndOddsUrlBuilder(league).lines(week, year)
    return routes.scrape_url(LinesScraper, url)


@bp.route("/games", methods=["GET"])
def games():
    league = request.args.get("league", default="nfl", type=str)
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)
    url = EspnUrlBuilder(league).schedule(week, year)
    return routes.scrape_url(ScheduleScraper, url)


@bp.route("/games/<int:game_id>/boxscore", methods=["GET"])
def boxscore(game_id):
    league = request.args.get("league", default="nfl", type=str)
    url = EspnUrlBuilder(league).boxscore(game_id)
    return routes.scrape_url(BoxscoreScraper, url)


@bp.route("/games/<int:game_id>/gamecast", methods=["GET"])
def gamecast(game_id):
    league = request.args.get("league", default="nfl", type=str)
    url = EspnUrlBuilder(league).gamecast(game_id)
    return routes.scrape_url(GamecastScraper, url)


@bp.route("/games/<int:game_id>/playbyplay", methods=["GET"])
def playbyplay(game_id):
    league = request.args.get("league", default="nfl", type=str)
    finished = request.args.get("finished", type=int)
    url = EspnUrlBuilder(league).play_by_play(game_id)
    return routes.scrape_url(PlayByPlayScraper, url, finished)
