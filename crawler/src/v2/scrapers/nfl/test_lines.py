import pytest
from v2.scrapers.nfl.lines import LinesScraper
from v2.url_builders.scores_and_odds import ScoresAndOddsUrlBuilder

SCRAPER = LinesScraper
URL = "https://www.scoresandodds.com/nfl?week=2023-reg-6"
FIXTURE = "nfl_lines.html"


def test_nfl_url_default(scraper, mock_get):
    scraper.fetch(ScoresAndOddsUrlBuilder("nfl").lines(None, None))
    mock_get.assert_called_once_with("https://www.scoresandodds.com/nfl")


def test_nfl_url_specific(scraper, mock_get):
    scraper.fetch(ScoresAndOddsUrlBuilder("nfl").lines(6, 2023))
    mock_get.assert_called_once_with(URL)


def test_cfb_url(scraper, mock_get):
    scraper.fetch(ScoresAndOddsUrlBuilder("cfb").lines(None, None))
    mock_get.assert_called_once_with("https://www.scoresandodds.com/ncaaf")


@pytest.mark.skip(
    reason="scoresandodds.com now returns an empty shell to headless chrome"
)
def test_parse_data(loaded):
    data = loaded.parse_data()
    games = data["games"]

    assert data["week"] == "6"
    assert len(games) > 0
    first = games[0]
    assert first["away_team"] == {"name": "Broncos", "num": "111"}
    assert first["home_team"] == {"name": "Chiefs", "num": "112"}
    assert first["full_game"] == {"spread": "-10.5", "total": "u47.5"}
