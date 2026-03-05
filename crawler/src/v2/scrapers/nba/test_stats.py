from v2.scrapers.nba.stats import StatsScraper
from v2.url_builders.basketball_reference import BasketballReferenceUrlBuilder

SCRAPER = StatsScraper
URL = "https://www.basketball-reference.com/boxscores/202310240DEN.html"
FIXTURE = "nba_stats.html"


def test_url(scraper, mock_get):
    scraper.fetch(BasketballReferenceUrlBuilder().boxscore("202310240DEN"))
    mock_get.assert_called_once_with(URL)


def test_player_stats(loaded):
    data = loaded.parse_data("LAL", "DEN")

    away = data["away_player_stats"]
    assert len(away) == 12
    russell = away[0]
    assert russell["abbr"] == "russeda01"
    assert russell["sp"] == 2171
    assert russell["fg"] == 4
    assert russell["fga"] == 12
    assert russell["pts"] == 11
    assert russell["ortg"] == 91
    assert russell["drtg"] == 125


def test_team_stats(loaded):
    data = loaded.parse_data("LAL", "DEN")

    away_team = data["away_team_stats"][0]
    assert away_team["sp"] == 14400
    assert away_team["fg"] == 41
    assert away_team["pts"] == 107
    assert away_team["ortg"] == 111.1
    assert away_team["drtg"] == 123.6
    assert "abbr" not in away_team
