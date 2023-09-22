import pytest
from v2.scrapers.playbyplay_scraper import PlaybyplayScraper


class TestPlaybyplayScraper:
    NFL_URL = "https://www.espn.com/nfl/playbyplay/_/gameId/401547658"
    CFB_URL = "https://www.espn.com/college-football/playbyplay/_/gameId/401547658"
    MOCK_FILE = "playbyplay.html"

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with PlaybyplayScraper() as scraper:
            scraper.get_url_or_file(TestPlaybyplayScraper.NFL_URL, TestPlaybyplayScraper.MOCK_FILE)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with PlaybyplayScraper() as scraper:
            yield scraper

    def test_nfl_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658", 'nfl')

        mock_get.assert_called_once_with(TestPlaybyplayScraper.NFL_URL)

    def test_current_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658", 'cfb')

        mock_get.assert_called_once_with(TestPlaybyplayScraper.CFB_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
            "game": {
              "received": "New Orleans Saints",
            }
        }