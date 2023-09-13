import pytest
from v2.scrapers.schedule_scraper import ScheduleScraper


class TestScheduleScraper:
    SPECIFIC_WEEK_URL = f"{ScheduleScraper.THIS_WEEK_URL}/_/week/1/year/2023/seasontype/2"
    MOCK_PATH = "file:///project/tmp/schedule.html"
    MOCK_GAME_IDS = [
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

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with ScheduleScraper() as scraper:
            scraper.driver.get(TestScheduleScraper.MOCK_PATH)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with ScheduleScraper() as scraper:
            yield scraper

    def test_this_week_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch(None, None)

        mock_get.assert_called_once_with(ScheduleScraper.THIS_WEEK_URL)

    def test_specific_week_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("1", "2023")

        mock_get.assert_called_once_with(TestScheduleScraper.SPECIFIC_WEEK_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
            "year": "2023",
            "week": "1",
            "espn_game_ids": TestScheduleScraper.MOCK_GAME_IDS
        }
