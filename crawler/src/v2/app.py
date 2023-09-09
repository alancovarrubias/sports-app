from flask import Flask, request
from v2.scrapers.schedule_scraper import ScheduleScraper


def process_request(Scraper, *args):
    scraper_instance = Scraper()
    scraper_instance.fetch(*args)
    return scraper_instance.parse_data()


app = Flask(__name__)


@app.route("/api/games", methods=["GET"])
def my_route():
    year = request.args.get("year", type=int)
    week = request.args.get("week", type=int)

    return process_request(ScheduleScraper, week, year)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
