from flask import Flask, request
from v2.scrapers.playbyplay_scraper import PlaybyplayScraper
from v2.scrapers.boxscore_scraper import BoxscoreScraper
from v2.scrapers.schedule_scraper import ScheduleScraper


def process_request(Scraper, *args):
    scraper_instance = Scraper()
    scraper_instance.fetch(*args)
    return scraper_instance.parse_data()


app = Flask(__name__)

@app.route("/api/games", methods=["GET"])
def games_index():
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)
    league = request.args.get("league", type=str)

    if league == 'nfl':
        return process_request(ScheduleScraper, week, year, league)
    if league == 'cfb':
        cfb80 = process_request(ScheduleScraper, week, year, 'cfb80')
        cfb81 = process_request(ScheduleScraper, week, year, 'cfb81')
        cfb80['espn_game_ids'] = cfb80['espn_game_ids'] + cfb81['espn_game_ids']
        return cfb80


@app.route("/api/games/<int:game_id>", methods=["GET"])
def games_show(game_id):
    league = request.args.get("league", type=str)
    return process_request(BoxscoreScraper, game_id, league)

@app.route("/api/games/<int:game_id>/playbyplay", methods=["GET"])
def games_show_playbyplay(game_id):
    league = request.args.get("league", type=str)
    return process_request(PlaybyplayScraper, game_id, league)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
