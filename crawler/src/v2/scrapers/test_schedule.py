import pytest
from crawler.src.v2.scrapers.schedule import ScheduleScraper


class TestScheduleScraper:
    NFL_URL = "https://www.espn.com/nfl/schedule"
    SPECIFIC_NFL_URL = "https://www.espn.com/nfl/schedule/_/week/1/year/2023/seasontype/2"
    CFB_80_URL = "https://www.espn.com/college-football/schedule/_/group/80"
    SPECIFIC_CFB_80_URL = "https://www.espn.com/college-football/schedule/_/week/1/year/2023/seasontype/2/group/80"
    CFB_81_URL = "https://www.espn.com/college-football/schedule/_/group/81"
    SPECIFIC_CFB_81_URL = "https://www.espn.com/college-football/schedule/_/week/1/year/2023/seasontype/2/group/81"
    MOCK_FILE = "schedule.html"
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
            scraper.get_url_or_file(TestScheduleScraper.NFL_URL, TestScheduleScraper.MOCK_FILE)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with ScheduleScraper() as scraper:
            yield scraper

    def test_cfb80_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch(None, None, "cfb80")

        mock_get.assert_called_once_with(TestScheduleScraper.CFB_80_URL)

    def test_specific_cfb80_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("1", "2023", "cfb80")

        mock_get.assert_called_once_with(TestScheduleScraper.SPECIFIC_CFB_80_URL)

    def test_cfb81_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch(None, None, "cfb81")

        mock_get.assert_called_once_with(TestScheduleScraper.CFB_81_URL)

    def test_specific_cfb81_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("1", "2023", "cfb81")

        mock_get.assert_called_once_with(TestScheduleScraper.SPECIFIC_CFB_81_URL)

    def test_nfl_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch(None, None, "nfl")

        mock_get.assert_called_once_with(TestScheduleScraper.NFL_URL)

    def test_specific_nfl_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("1", "2023", "nfl")

        mock_get.assert_called_once_with(TestScheduleScraper.SPECIFIC_NFL_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
            "year": "2023",
            "week": "1",
            "espn_ids": TestScheduleScraper.MOCK_GAME_IDS
        }
