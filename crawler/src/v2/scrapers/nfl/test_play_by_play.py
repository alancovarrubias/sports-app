from v2.scrapers.nfl.play_by_play import PlayByPlayScraper
from v2.url_builders.espn import EspnUrlBuilder

SCRAPER = PlayByPlayScraper
URL = "https://www.espn.com/nfl/playbyplay/_/gameId/401547658"
FIXTURE = "nfl_playbyplay.html"


def test_nfl_url(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("nfl").play_by_play(401547658))
    mock_get.assert_called_once_with(URL)


def test_cfb_url(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("cfb80").play_by_play(401547658))
    mock_get.assert_called_once_with(
        "https://www.espn.com/college-football/playbyplay/_/gameId/401547658"
    )


def test_parse_data(loaded):
    assert loaded.parse_data(finished=1) == {"received": "Houston Texans"}
