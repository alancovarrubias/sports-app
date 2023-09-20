import pytest
from v2.scrapers.playbyplay_scraper import PlaybyplayScraper


def save_url_to_file(driver, url, file):
    driver.get(url)
    with open(f"/project/tmp/{file}", "w", encoding="utf-8") as f:
        f.write(driver.page_source)


class TestPlaybyplayScraper:
    MOCK_URL = "https://www.espn.com/nfl/playbyplay/_/gameId/401547658"
    MOCK_FILE = "playbyplay.html"

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with PlaybyplayScraper() as scraper:
            scraper.get_url_or_file(TestPlaybyplayScraper.MOCK_URL, TestPlaybyplayScraper.MOCK_FILE)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with PlaybyplayScraper() as scraper:
            yield scraper

    def test_current_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658")

        mock_get.assert_called_once_with(TestPlaybyplayScraper.MOCK_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
            "game": {
              "kicked": "HST",
            }
        }