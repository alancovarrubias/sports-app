import pytest
from crawler.src.v2.scrapers.boxscore import BoxscoreScraper


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
        data = mocked_scraper.parse_data()
        assert data['start_time'] == "12:00 AM, August 28, 2023"
        assert data['game_clock'] == "Final"
        away_team = data['away_team']
        assert away_team['name'] == "Houston Texans"
        assert away_team['abbr'] == "HOU"
        assert away_team['score'] == "17"
        assert away_team['comp_att'] == "15/27"
        assert away_team['passing_yards'] == "127"
        assert away_team['carries'] == "31"
        assert away_team['rushing_yards'] == "131"
        assert away_team['longest_rush'] == "21"
        assert away_team['longest_pass'] == "24"
        home_team = data['home_team']
        assert home_team['name'] == "New Orleans Saints"
        assert home_team['abbr'] == "NO"
        assert home_team['score'] == "13"
        assert home_team['comp_att'] == "28/54"
        assert home_team['passing_yards'] == "265"
        assert home_team['carries'] == "21"
        assert home_team['rushing_yards'] == "91"
        assert home_team['longest_rush'] == "26"
        assert home_team['longest_pass'] == "31"
