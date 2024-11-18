from flask import Flask, request
from v2.scrapers.play_by_play import PlayByPlayScraper
from v2.scrapers.boxscore import BoxscoreScraper
from v2.scrapers.schedule import ScheduleScraper
from v2.scrapers.lines import LinesScraper
from v2.url_builders.espn import EspnUrlBuilder
from v2.url_builders.scores_and_odds import ScoresAndOddsUrlBuilder

def scrape_url(Scraper, url, *args):
    with Scraper(url) as scraper:
        return scraper.parse_data(*args)

app = Flask(__name__)

@app.route("/api/lines", methods=["GET"])
def lines_index():
    league = request.args.get("league", type=str)
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)
    url = ScoresAndOddsUrlBuilder(league).lines(week, year)
    return scrape_url(LinesScraper, url)

@app.route("/api/games", methods=["GET"])
def games_index():
    league = request.args.get("league", type=str)
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)
    url = EspnUrlBuilder(league).schedule(week, year)
    return scrape_url(ScheduleScraper, url)

@app.route("/api/games/<int:game_id>", methods=["GET"])
def games_show(game_id):
    league = request.args.get("league", type=str)
    url = EspnUrlBuilder(league).boxscore(game_id)
    return scrape_url(BoxscoreScraper, url)

@app.route("/api/games/<int:game_id>/playbyplay", methods=["GET"])
def games_show_play_by_play(game_id):
    league = request.args.get("league", type=str)
    finished = request.args.get("finished", type=int)
    url = EspnUrlBuilder(league).play_by_play(game_id)
    return scrape_url(PlayByPlayScraper, url, finished)

@app.route("/health", methods=["GET"])
def health_check():
    return {"status": "OK"}, 200

if __name__ == "__main__":
    app.run(host="0.0.0.0")
