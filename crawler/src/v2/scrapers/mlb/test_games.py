from v2.scrapers.mlb.games import GamesScraper
from v2.url_builders.baseball_reference import BaseballReferenceUrlBuilder

SCRAPER = GamesScraper
URL = "https://www.baseball-reference.com/teams/NYY/2024-schedule-scores.shtml"
FIXTURE = "mlb_games.html"


def test_url(scraper, mock_get):
    scraper.fetch(BaseballReferenceUrlBuilder().games("NYY", 2024))
    mock_get.assert_called_once_with(URL)


def test_parse_data(loaded):
    data = loaded.parse_data()
    games = data["games"]

    assert len(games) == 81
    assert games[0] == {
        "date": "2024-04-05",
        "home_team": "NYY",
        "away_team": "TOR",
        "num": 0,
    }
    assert data["team_link"] == "NYA"
    # only home games — every row has NYY as host
    assert all(g["home_team"] == "NYY" for g in games)
