import pytest
from v2_app import app, process_request
from flask import json
from v2.scrapers.boxscore_scraper import BoxscoreScraper
from v2.scrapers.schedule_scraper import ScheduleScraper
from unittest.mock import Mock


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

@pytest.fixture
def mock_process_request(mocker):
    process_request = mocker.patch("v2_app.process_request")
    process_request.return_value = []
    yield process_request

def test_games_show(mock_process_request, client):
    response = client.get("/api/games/12345")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(BoxscoreScraper, 12345)

def test_games_show(mock_process_request, client):
    response = client.get("/api/games/12345")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(BoxscoreScraper, 12345)

def test_games_index_with_query_params(mock_process_request, client):
    response = client.get("/api/games?year=2020&week=1")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(ScheduleScraper, 1, 2020)

def test_games_index_empty_query_params(mock_process_request, client):
    response = client.get("/api/games")
    assert response.status_code == 200
    assert json.loads(response.data) == []

    mock_process_request.assert_called_once_with(ScheduleScraper, None, None)

class TestScraper:
    def fetch(self, *args):
        pass

    def parse_data(self):
        pass


def test_process_request(mocker):
    mock_constructor = Mock(spec=TestScraper)
    mock_instance = TestScraper()
    mock_fetch = mocker.patch.object(mock_instance, "fetch", autospec=True)
    mock_parse_data = mocker.patch.object(mock_instance, "parse_data", autospec=True)
    mock_parse_data.return_value = {}
    mock_constructor.return_value = mock_instance
    args = [1, 2020]
    return_value = process_request(mock_constructor, *args)

    mock_constructor.assert_called_once()
    mock_fetch.assert_called_once_with(*args)
    assert return_value == {}
