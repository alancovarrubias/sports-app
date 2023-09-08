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

    def test_away_comp_att(self, mocked_scraper):
        assert mocked_scraper.get_away_comp_att() == "15/27"

    def test_away_passing_yards(self, mocked_scraper):
        assert mocked_scraper.get_away_passing_yards() == "104"

    def test_away_carries(self, mocked_scraper):
        assert mocked_scraper.get_away_carries() == "31"

    def test_away_rushing_yards(self, mocked_scraper):
        assert mocked_scraper.get_away_rushing_yards() == "131"

    def test_home_comp_att(self, mocked_scraper):
        assert mocked_scraper.get_home_comp_att() == "28/54"

    def test_home_passing_yards(self, mocked_scraper):
        assert mocked_scraper.get_home_passing_yards() == "257"

    def test_home_carries(self, mocked_scraper):
        assert mocked_scraper.get_home_carries() == "21"

    def test_home_rushing_yards(self, mocked_scraper):
        assert mocked_scraper.get_home_rushing_yards() == "91"

    def test_game_time(self, mocked_scraper):
        assert mocked_scraper.get_game_time() == "Final"

    def test_away_scores(self, mocked_scraper):
        assert mocked_scraper.get_away_scores() == ["HOU", "7", "3", "7", "0", "17"]

    def test_home_scores(self, mocked_scraper):
        assert mocked_scraper.get_home_scores() == ["NO", "0", "7", "3", "3", "13"]

    def test_away_team(self, mocked_scraper):
        assert mocked_scraper.get_away_team() == "Houston Texans"

    def test_home_team(self, mocked_scraper):
        assert mocked_scraper.get_home_team() == "New Orleans Saints"

    def test_game_time(self, mocked_scraper):
        assert mocked_scraper.get_game_time() == "12:00 AM, August 28, 2023"
