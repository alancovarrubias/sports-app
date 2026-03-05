from v2.scrapers.mlb.stats import StatsScraper
from v2.url_builders.baseball_reference import BaseballReferenceUrlBuilder

SCRAPER = StatsScraper
URL = "https://www.baseball-reference.com/boxes/NYA/NYA202404050.shtml"
FIXTURE = "mlb_stats.html"

def test_url(scraper, mock_get):
    scraper.fetch(BaseballReferenceUrlBuilder().boxscore("NYA202404050"))
    mock_get.assert_called_once_with(URL)


def test_game_metadata(loaded):
    data = loaded.parse_data()
    assert "1:05" in data["time"]
    assert len(data["plays"]) == 78


def test_first_play(loaded):
    play = loaded.parse_data()["plays"][0]
    assert play["at_bat"] == "TOR"
    assert play["batter"] == "George Springer"
    assert play["pitcher"] == "Marcus Stroman"
    assert "Double" in play["text"]


def test_player_batting_stat(loaded):
    away = loaded.parse_data()["away_player_stats"]
    springer = away[0]
    assert springer["stat_type"] == "Batting"
    assert springer["name"] == "George Springer"
    assert springer["abbr"] == "springe01"
    assert springer["position"] == "RF"
    assert springer["ab"] == 3
    assert springer["h"] == 1
    assert springer["bb"] == 2


def test_team_stats(loaded):
    data = loaded.parse_data()
    away_team = data["away_team_stats"]

    batting, pitching = away_team
    assert batting["stat_type"] == "Batting"
    assert batting["ab"] == 35
    assert batting["h"] == 7
    assert pitching["stat_type"] == "Pitching"
    assert pitching["ip"] == 9
    assert pitching["so"] == 11
