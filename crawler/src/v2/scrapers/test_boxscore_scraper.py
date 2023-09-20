import pytest
from v2.scrapers.boxscore_scraper import BoxscoreScraper


class TestBoxscoreScraper:
    MOCK_URL = "https://www.espn.com/nfl/boxscore/_/gameId/401547658"
    MOCK_FILE = "boxscore.html"

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with BoxscoreScraper() as scraper:
            scraper.get_url_or_file(TestBoxscoreScraper.MOCK_URL, TestBoxscoreScraper.MOCK_FILE)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with BoxscoreScraper() as scraper:
            yield scraper

    def test_current_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658")

        mock_get.assert_called_once_with(TestBoxscoreScraper.MOCK_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
            "game": {
                "start_time": "12:00 AM, August 28, 2023",
                "game_clock": "Final",
                "away_team": {
                    "name": "Houston Texans",
                    "comp_att": "15/27",
                    "passing_yards": "104",
                    "carries": "31",
                    "rushing_yards": "131",
                },
                "home_team": {
                    "name": "New Orleans Saints",
                    "comp_att": "28/54",
                    "passing_yards": "257",
                    "carries": "21",
                    "rushing_yards": "91",
                },
            }
        }

    def test_away_scores(self, mocked_scraper):
        assert mocked_scraper.get_scores(BoxscoreScraper.AWAY_INDEX) == [
            "HOU",
            "7",
            "3",
            "7",
            "0",
            "17",
        ]

    def test_home_scores(self, mocked_scraper):
        assert mocked_scraper.get_scores(BoxscoreScraper.HOME_INDEX) == [
            "NO",
            "0",
            "7",
            "3",
            "3",
            "13",
        ]
