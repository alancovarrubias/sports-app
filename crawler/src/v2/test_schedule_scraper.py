import pytest
from schedule_scraper import ScheduleScraper


class TestScheduleScraper:
    @pytest.fixture(scope="class")
    def scraper(self):
        with ScheduleScraper() as scraper:
            yield scraper

    def test_game_ids(self, scraper):
        game_ids = [
            "401547353",
            "401547403",
            "401547397",
            "401547404",
            "401547398",
            "401547399",
            "401547405",
            "401547406",
            "401547396",
            "401547407",
            "401547400",
            "401547402",
            "401547401",
            "401547408",
            "401547409",
            "401547352",
        ]
        assert scraper.get_game_ids() == game_ids
