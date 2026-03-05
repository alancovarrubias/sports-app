from v2.scrapers.mlb.lineups import LineupsScraper
from v2.url_builders.baseball_press import BaseballPressUrlBuilder

SCRAPER = LineupsScraper
URL = "https://www.baseballpress.com/lineups"
FIXTURE = "mlb_lineups.html"


def test_url_no_date(scraper, mock_get):
    scraper.fetch(BaseballPressUrlBuilder().lineups())
    mock_get.assert_called_once_with(URL)


def test_url_with_date(scraper, mock_get):
    scraper.fetch(BaseballPressUrlBuilder().lineups("2024-04-05"))
    mock_get.assert_called_once_with(URL + "/2024-04-05")


def test_parse_data(loaded):
    lineups = loaded.parse_data()["lineups"]

    assert len(lineups) > 0
    first = lineups[0]
    assert first["away_team"]
    assert first["home_team"]
    assert first["local_time"]
    assert first["away_pitcher"]
    assert first["home_pitcher"]
    assert len(first["away_players"]) == 9
    assert len(first["home_players"]) == 9
