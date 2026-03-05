from v2.scrapers.mlb.teams import TeamsScraper
from v2.url_builders.baseball_reference import BaseballReferenceUrlBuilder

SCRAPER = TeamsScraper
URL = "https://www.baseball-reference.com/leagues/MLB/2024.shtml"
FIXTURE = "mlb_teams.html"


def test_url(scraper, mock_get):
    scraper.fetch(BaseballReferenceUrlBuilder().teams(2024))
    mock_get.assert_called_once_with(URL)


def test_parse_data(loaded):
    teams = loaded.parse_data()["teams"]

    assert len(teams) == 30
    assert teams[0] == {"abbr": "ARI", "name": "Diamondbacks", "city": "Arizona"}


def test_two_word_team_names(loaded):
    by_abbr = {t["abbr"]: t for t in loaded.parse_data()["teams"]}

    assert by_abbr["BOS"] == {"abbr": "BOS", "name": "Red Sox", "city": "Boston"}
    assert by_abbr["CHW"] == {"abbr": "CHW", "name": "White Sox", "city": "Chicago"}
    assert by_abbr["TOR"] == {"abbr": "TOR", "name": "Blue Jays", "city": "Toronto"}
