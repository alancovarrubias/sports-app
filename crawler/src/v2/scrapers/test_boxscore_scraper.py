import pytest
from v2.scrapers.boxscore_scraper import BoxscoreScraper


def save_url_to_file(driver, url, file):
    driver.get(url)
    with open(f"/project/tmp/{file}", "w", encoding="utf-8") as f:
        f.write(driver.page_source)


class TestBoxscore:
    MOCKED_URL = "https://www.espn.com/nfl/boxscore/_/gameId/401547658"
    MOCK_PATH = "file:///project/tmp/boxscore.html"

    @pytest.fixture(scope="class")
    def mocked_scraper(self):
        with BoxscoreScraper() as scraper:
            scraper.driver.get(TestBoxscore.MOCK_PATH)
            yield scraper

    @pytest.fixture(scope="class")
    def scraper(self):
        with BoxscoreScraper() as scraper:
            yield scraper

    def test_current_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("401547658")

        mock_get.assert_called_once_with(TestBoxscore.MOCKED_URL)

    def test_scrape_data(self, mocked_scraper):
        assert mocked_scraper.parse_data() == {
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
