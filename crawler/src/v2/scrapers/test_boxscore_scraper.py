import pytest
from v2.scrapers.boxscore_scraper import BoxscoreScraper


class TestBoxscoreScraper:
    NFL_URL = "https://www.espn.com/nfl/boxscore/_/gameId/401547658"
    CFB_URL = "https://www.espn.com/college-football/boxscore/_/gameId/401547658"
    MOCK_FILE = "boxscore.html"

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with BoxscoreScraper() as scraper:
            scraper.get_url_or_file(TestBoxscoreScraper.NFL_URL, TestBoxscoreScraper.MOCK_FILE)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with BoxscoreScraper() as scraper:
            yield scraper

    def test_nfl_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658", 'nfl')

        mock_get.assert_called_once_with(TestBoxscoreScraper.NFL_URL)

    def test_cfb_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658", 'cfb')

        mock_get.assert_called_once_with(TestBoxscoreScraper.CFB_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
            "start_time": "12:00 AM, August 28, 2023",
            "game_clock": "Final",
            "away_team": {
                "name": "Houston Texans",
                "abbr": "HOU",
                "score": "17",
                "comp_att": "15/27",
                "passing_yards": "127",
                "carries": "31",
                "rushing_yards": "131",
                "longest_rush": "21",
                "longest_pass": "26",
            },
            "home_team": {
                "name": "New Orleans Saints",
                "abbr": "NO",
                "score": "13",
                "comp_att": "28/54",
                "passing_yards": "265",
                "carries": "21",
                "rushing_yards": "91",
                "longest_rush": "26",
                "longest_pass": "53",
            },
        }
