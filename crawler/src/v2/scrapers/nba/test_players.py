from v2.scrapers.nba.players import PlayersScraper
from v2.url_builders.basketball_reference import BasketballReferenceUrlBuilder

SCRAPER = PlayersScraper
URL = "https://www.basketball-reference.com/teams/LAL/2024.html"
FIXTURE = "nba_players.html"


def test_url(scraper, mock_get):
    scraper.fetch(BasketballReferenceUrlBuilder().players("LAL", 2024))
    mock_get.assert_called_once_with(URL)


def test_parse_data(loaded):
    players = loaded.parse_data()["players"]

    assert len(players) == 21
    assert players[0] == {
        "name": "Colin Castleton",
        "abbr": "castlco01",
        "position": "C",
    }
    # every player has all three fields populated
    assert all(p["name"] and p["abbr"] and p["position"] for p in players)
