import pytest
from v2_app import app
from flask import json
from crawler.src.v2.scrapers.playbyplay import PlaybyplayScraper
from crawler.src.v2.scrapers.boxscore import BoxscoreScraper
from crawler.src.v2.scrapers.schedule import ScheduleScraper
from crawler.src.v2.scrapers.lines import LinesScraper


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

@pytest.fixture
def mock_process_request(mocker):
    process_request = mocker.patch("v2_app.process_request", autospec=True)
    process_request.return_value = []
    yield process_request

def test_lines_index(mock_process_request, client):
    response = client.get("/api/lines?league=nfl")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(LinesScraper, None, None, 'nfl')

def test_games_show(mock_process_request, client):
    response = client.get("/api/games/12345/playbyplay?league=cfb&finished=0")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(PlaybyplayScraper, 12345, 'cfb', '0')

def test_games_show(mock_process_request, client):
    response = client.get("/api/games/12345?league=nfl")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(BoxscoreScraper, 12345, 'nfl')

def test_games_index_with_query_params(mock_process_request, client):
    response = client.get("/api/games?year=2020&week=1&league=nfl")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(ScheduleScraper, 1, 2020, 'nfl')

def test_games_index_empty_query_params(mock_process_request, client):
    response = client.get("/api/games?league=cfb")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(ScheduleScraper, None, None, 'cfb')
