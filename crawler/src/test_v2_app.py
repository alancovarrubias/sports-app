import pytest
from flask import json
from v2_app import app

from v2.scrapers.nfl.schedule import ScheduleScraper
from v2.scrapers.nfl.boxscore import BoxscoreScraper
from v2.scrapers.nfl.play_by_play import PlayByPlayScraper
from v2.scrapers.nfl.lines import LinesScraper
from v2.scrapers.nba.teams import TeamsScraper as NbaTeamsScraper
from v2.scrapers.nba.stats import StatsScraper as NbaStatsScraper
from v2.scrapers.mlb.teams import TeamsScraper as MlbTeamsScraper
from v2.scrapers.mlb.games import GamesScraper as MlbGamesScraper
from v2.scrapers.mlb.forecast import ForecastScraper
from v2.scrapers.mlb.lineups import LineupsScraper


@pytest.fixture
def client():
    with app.test_client() as c:
        yield c


@pytest.fixture
def mock_scrape(mocker):
    m = mocker.patch("v2.routes.scrape_url", autospec=True)
    m.return_value = {}
    return m


# ─── Football ────────────────────────────────────────────────────────────────

def test_lines(client, mock_scrape):
    resp = client.get("/api/football/lines?league=nfl&week=6&year=2023")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        LinesScraper, "https://www.scoresandodds.com/nfl?week=2023-reg-6"
    )


def test_games_schedule(client, mock_scrape):
    resp = client.get("/api/football/games?league=nfl&week=1&year=2023")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        ScheduleScraper,
        "https://www.espn.com/nfl/schedule/_/week/1/year/2023/seasontype/2",
    )


def test_boxscore(client, mock_scrape):
    resp = client.get("/api/football/games/12345/boxscore?league=nfl")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        BoxscoreScraper, "https://www.espn.com/nfl/boxscore/_/gameId/12345"
    )


def test_playbyplay(client, mock_scrape):
    resp = client.get("/api/football/games/12345/playbyplay?league=cfb80&finished=1")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        PlayByPlayScraper,
        "https://www.espn.com/college-football/playbyplay/_/gameId/12345",
        1,
    )


def test_playbyplay_defaults_to_nfl(client, mock_scrape):
    resp = client.get("/api/football/games/12345/playbyplay?finished=1")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        PlayByPlayScraper,
        "https://www.espn.com/nfl/playbyplay/_/gameId/12345",
        1,
    )


# ─── NBA ─────────────────────────────────────────────────────────────────────

def test_nba_teams(client, mock_scrape):
    resp = client.get("/api/nba/teams?season=2024")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        NbaTeamsScraper,
        "https://www.basketball-reference.com/leagues/NBA_2024_standings.html",
    )


def test_nba_stats(client, mock_scrape):
    resp = client.get("/api/nba/games/202310240DEN/stats?away_team=LAL&home_team=DEN")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        NbaStatsScraper,
        "https://www.basketball-reference.com/boxscores/202310240DEN.html",
        "LAL",
        "DEN",
    )


def test_nba_games_iterates_all_months(client, mock_scrape):
    mock_scrape.return_value = {"games": [{"date": "x"}]}
    resp = client.get("/api/nba/games?season=2024")
    assert resp.status_code == 200
    assert mock_scrape.call_count == 9
    assert json.loads(resp.data) == {"games": [{"date": "x"}] * 9}


# ─── MLB ─────────────────────────────────────────────────────────────────────

def test_mlb_teams(client, mock_scrape):
    resp = client.get("/api/mlb/teams?season=2024")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        MlbTeamsScraper,
        "https://www.baseball-reference.com/leagues/MLB/2024.shtml",
    )


def test_mlb_team_games(client, mock_scrape):
    resp = client.get("/api/mlb/teams/NYY/games?season=2024")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        MlbGamesScraper,
        "https://www.baseball-reference.com/teams/NYY/2024-schedule-scores.shtml",
    )


def test_mlb_forecast(client, mock_scrape):
    resp = client.get("/api/mlb/teams/NYY/forecast?date=2026-03-06")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        ForecastScraper,
        "https://www.wunderground.com/hourly/us/ny/the-bronx/10451/date/2026-03-06",
    )


def test_mlb_lineups(client, mock_scrape):
    resp = client.get("/api/mlb/lineups")
    assert resp.status_code == 200
    mock_scrape.assert_called_once_with(
        LineupsScraper, "https://www.baseballpress.com/lineups"
    )
