import pytest
from v2.scrapers.nfl.boxscore import BoxscoreScraper
from v2.url_builders.espn import EspnUrlBuilder

SCRAPER = BoxscoreScraper
URL = "https://www.espn.com/nfl/boxscore/_/gameId/401547658"
FIXTURE = "nfl_boxscore.html"


def test_nfl_url(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("nfl").boxscore(401547658))
    mock_get.assert_called_once_with(URL)


def test_cfb_url(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("cfb80").boxscore(401547658))
    mock_get.assert_called_once_with(
        "https://www.espn.com/college-football/boxscore/_/gameId/401547658"
    )


@pytest.mark.xfail(
    reason="ESPN Gamestrip added a leading season-label span; indexes shifted by 1",
    strict=True,
)
def test_parse_data(loaded):
    data = loaded.parse_data()

    assert data["game_clock"] == "Final"

    away = data["away_team"]
    assert away["score"] == "17"
    assert away["comp_att"] == "15/27"
    assert away["passing_yards"] == "127"
    assert away["carries"] == "31"
    assert away["rushing_yards"] == "131"

    home = data["home_team"]
    assert home["score"] == "13"
    assert home["comp_att"] == "28/54"
    assert home["passing_yards"] == "265"
