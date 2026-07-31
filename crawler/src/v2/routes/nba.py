from flask import Blueprint, request

import v2.routes as routes
from v2.scrapers.nba.teams import TeamsScraper
from v2.scrapers.nba.players import PlayersScraper
from v2.scrapers.nba.games import GamesScraper, MONTHS
from v2.scrapers.nba.stats import StatsScraper
from v2.scrapers.nba.lines import LinesScraper
from v2.url_builders.basketball_reference import BasketballReferenceUrlBuilder
from v2.url_builders.scores_and_odds import ScoresAndOddsUrlBuilder

bp = Blueprint("nba", __name__, url_prefix="/api/nba")
bbr = BasketballReferenceUrlBuilder()


@bp.route("/teams", methods=["GET"])
def teams():
    season = request.args.get("season", type=int)
    return routes.scrape_url(
        TeamsScraper, bbr.teams(season),
        sport="nba", resource_type="teams", cache_key=str(season)
    )


@bp.route("/teams/<team>/players", methods=["GET"])
def players(team):
    season = request.args.get("season", type=int)
    return routes.scrape_url(
        PlayersScraper, bbr.players(team, season),
        sport="nba", resource_type="players", cache_key=f"{team}{season}"
    )


@bp.route("/games", methods=["GET"])
def games():
    season = request.args.get("season", type=int)
    all_games = []
    for month in MONTHS:
        data = routes.scrape_url(
            GamesScraper, bbr.games(season, month),
            sport="nba", resource_type="games", cache_key=f"{season}{month}"
        )
        all_games += data["games"]
    return {"games": all_games}


@bp.route("/games/<game_url>/stats", methods=["GET"])
def stats(game_url):
    away_team = request.args.get("away_team", type=str)
    home_team = request.args.get("home_team", type=str)
    return routes.scrape_url(
        StatsScraper, bbr.boxscore(game_url), away_team, home_team,
        sport="nba", resource_type="stats", cache_key=game_url
    )


@bp.route("/lines", methods=["GET"])
def lines():
    date = request.args.get("date", type=str)
    url = ScoresAndOddsUrlBuilder("nba").lines(date=date)
    return routes.scrape_url(
        LinesScraper, url,
        sport="nba", resource_type="lines", cache_key=date
    )
