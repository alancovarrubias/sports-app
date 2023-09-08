import pytest
from v2.scrapers.schedule_scraper import ScheduleScraper


class TestScheduleScraper:
    MOCKED_URL = "https://www.espn.com/nfl/schedule/_/week/1/year/2023/seasontype/2"
    MOCK_PATH = "file:///project/tmp/schedule.html"

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with ScheduleScraper() as scraper:
            scraper.driver.get(TestScheduleScraper.MOCK_PATH)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with ScheduleScraper() as scraper:
            yield scraper

    def test_current_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("1", "2023")

        mock_get.assert_called_once_with(TestScheduleScraper.MOCKED_URL)

    def test_game_ids(self, mocked_scraper):
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
        assert mocked_scraper.get_game_ids() == game_ids
