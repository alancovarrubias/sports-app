import pytest
from crawler.src.v2.scrapers.play_by_play import PlayByPlayScraper

class TestPlayByPlayScraper:
    NFL_URL = "https://www.espn.com/nfl/playbyplay/_/gameId/401547658"
    CFB_URL = "https://www.espn.com/college-football/playbyplay/_/gameId/401547658"
    MOCK_FILE = "playbyplay.html"

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with PlayByPlayScraper() as scraper:
            scraper.get_url_or_file(TestPlayByPlayScraper.NFL_URL, TestPlaybyplayScraper.MOCK_FILE)
            scraper.logo_index = 0
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with PlayByPlayScraper() as scraper:
            yield scraper

    def test_nfl_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658", 'nfl', 1)

        mock_get.assert_called_once_with(TestPlayByPlayScraper.NFL_URL)

    def test_current_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658", 'cfb', 1)

        mock_get.assert_called_once_with(TestPlayByPlayScraper.CFB_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
            "received": "New Orleans Saints",
        }