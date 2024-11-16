from flask import Flask, request
from crawler.src.v2.scrapers.playbyplay import PlaybyplayScraper
from crawler.src.v2.scrapers.boxscore import BoxscoreScraper
from crawler.src.v2.scrapers.schedule import ScheduleScraper
from crawler.src.v2.scrapers.lines import LinesScraper

def process_request(Scraper, *args):
    with Scraper() as scraper:
        scraper.fetch(*args)
        return scraper.parse_data()

app = Flask(__name__)

@app.route("/api/lines", methods=["GET"])
def lines_index():
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)
    league = request.args.get("league", type=str)
    return process_request(LinesScraper, week, year, league)

@app.route("/api/games", methods=["GET"])
def games_index():
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)
    league = request.args.get("league", type=str)
    return process_request(ScheduleScraper, week, year, league)

@app.route("/api/games/<int:game_id>", methods=["GET"])
def games_show(game_id):
    league = request.args.get("league", type=str)
    return process_request(BoxscoreScraper, game_id, league)

@app.route("/api/games/<int:game_id>/playbyplay", methods=["GET"])
def games_show_playbyplay(game_id):
    league = request.args.get("league", type=str)
    finished = request.args.get("finished", type=int)
    return process_request(PlaybyplayScraper, game_id, league, finished)

@app.route("/health", methods=["GET"])
def health_check():
    return {"status": "OK"}, 200

if __name__ == "__main__":
    app.run(host="0.0.0.0")
