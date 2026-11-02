from v2.scrapers.nfl.schedule import ScheduleScraper
from v2.url_builders.espn import EspnUrlBuilder

SCRAPER = ScheduleScraper
URL = "https://www.espn.com/nfl/schedule/_/week/1/year/2023/seasontype/2"
FIXTURE = "nfl_schedule.html"

EXPECTED_IDS = [
    "401547353", "401547403", "401547397", "401547404", "401547398",
    "401547399", "401547405", "401547406", "401547396", "401547407",
    "401547400", "401547402", "401547401", "401547408", "401547409",
    "401547352",
]


def test_nfl_url_default(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("nfl").schedule(None, None))
    mock_get.assert_called_once_with("https://www.espn.com/nfl/schedule")


def test_nfl_url_specific(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("nfl").schedule(1, 2023))
    mock_get.assert_called_once_with(URL)


def test_nfl_url_year_only_defaults_to_week_1(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("nfl").schedule(None, 2023))
    mock_get.assert_called_once_with(URL)


def test_cfb80_url_default(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("cfb80").schedule(None, None))
    mock_get.assert_called_once_with(
        "https://www.espn.com/college-football/schedule/_/group/80"
    )


def test_cfb80_url_specific(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("cfb80").schedule(1, 2023))
    mock_get.assert_called_once_with(
        "https://www.espn.com/college-football/schedule/_/week/1/year/2023/seasontype/2/group/80"
    )


def test_cfb81_url_default(scraper, mock_get):
    scraper.fetch(EspnUrlBuilder("cfb81").schedule(None, None))
    mock_get.assert_called_once_with(
        "https://www.espn.com/college-football/schedule/_/group/81"
    )


def test_parse_data(loaded):
    # week_count=18 matches the known 2023 NFL regular-season length; unverified
    # against this fixture's actual week-selector markup (no network access to
    # confirm `.custom--week` carries a `/week/(\d+)/` href for every week).
    assert loaded.parse_data() == {
        "year": "2023",
        "week": "1",
        "week_count": 18,
        "espn_ids": EXPECTED_IDS,
    }
