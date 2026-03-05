from v2.scrapers.mlb.players import PlayersScraper
from v2.url_builders.baseball_reference import BaseballReferenceUrlBuilder

SCRAPER = PlayersScraper
URL = "https://www.baseball-reference.com/teams/NYY/2024.shtml"
FIXTURE = "mlb_players.html"


def test_url(scraper, mock_get):
    scraper.fetch(BaseballReferenceUrlBuilder().players("NYY", 2024))
    mock_get.assert_called_once_with(URL)


def test_parse_data(loaded):
    players = loaded.parse_data()["players"]

    assert len(players) > 0
    assert players[0] == {
        "name": "Austin Wells",
        "abbr": "wellsau01",
        "position": "C",
    }
    assert all(p["name"] and p["abbr"] for p in players)
