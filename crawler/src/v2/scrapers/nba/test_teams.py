from v2.scrapers.nba.teams import TeamsScraper
from v2.url_builders.basketball_reference import BasketballReferenceUrlBuilder

SCRAPER = TeamsScraper
URL = "https://www.basketball-reference.com/leagues/NBA_2024_standings.html"
FIXTURE = "nba_teams.html"


def test_url(scraper, mock_get):
    scraper.fetch(BasketballReferenceUrlBuilder().teams(2024))
    mock_get.assert_called_once_with(URL)


def test_parse_data(loaded):
    data = loaded.parse_data()
    teams = data["teams"]

    assert len(teams) == 30
    assert teams[0] == {"abbr": "ATL", "name": "Hawks", "city": "Atlanta"}
    assert teams[-1] == {"abbr": "WAS", "name": "Wizards", "city": "Washington"}


def test_trail_blazers_name_split(loaded):
    teams = loaded.parse_data()["teams"]
    portland = next(t for t in teams if t["abbr"] == "POR")
    assert portland == {"abbr": "POR", "name": "Trail Blazers", "city": "Portland"}
