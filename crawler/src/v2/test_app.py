import pytest
from v2.app import app, process_request
from flask import json
from v2.scrapers.schedule_scraper import ScheduleScraper
from v2.scrapers.base_scraper import BaseScraper
from unittest.mock import Mock


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


def test_games_resource(client, mocker):
    mocked_process_request = mocker.patch("v2.app.process_request")
    mocked_process_request.return_value = []
    response = client.get("/api/games?year=2020&week=1")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []

    mocked_process_request.assert_called_once_with(ScheduleScraper, 1, 2020)


class TestScraper(BaseScraper):
    def build_url(self, *args):
        return ""

    def parse_data(self):
        return {}


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
