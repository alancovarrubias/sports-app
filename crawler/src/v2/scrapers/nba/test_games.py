from v2.scrapers.nba.games import GamesScraper
from v2.url_builders.basketball_reference import BasketballReferenceUrlBuilder

SCRAPER = GamesScraper
URL = "https://www.basketball-reference.com/leagues/NBA_2024_games-october.html"
FIXTURE = "nba_games.html"


def test_url(scraper, mock_get):
    scraper.fetch(BasketballReferenceUrlBuilder().games(2024, "october"))
    mock_get.assert_called_once_with(URL)


def test_parse_data(loaded):
    games = loaded.parse_data()["games"]

    assert len(games) == 54
    assert games[0] == {
        "date": "20231024",
        "away_team": "LAL",
        "home_team": "DEN",
    }
