import pytest
from v2.scrapers.nfl.lines import LinesScraper


class TestLinesScraper:
    NFL_URL = "https://www.scoresandodds.com/nfl"
    SPECIFIC_NFL_URL = "https://www.scoresandodds.com/nfl?week=2023-reg-6"
    CFB_URL = "https://www.scoresandodds.com/ncaaf"
    SPECIFIC_CFB_URL = "https://www.scoresandodds.com/ncaaf?week=2023-reg-6"

    @pytest.fixture
    def mocked_scraper(self):
        with LinesScraper() as scraper:
            scraper.fetch("6", "2023", 'nfl')
            yield scraper

    @pytest.fixture
    def scraper(self):
        with LinesScraper() as scraper:
            yield scraper

    def test_nfl_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch(None, None, 'nfl')

        mock_get.assert_called_once_with(TestLinesScraper.NFL_URL)

    def test_specific_nfl_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("6", "2023", 'nfl')

        mock_get.assert_called_once_with(TestLinesScraper.SPECIFIC_NFL_URL)

    def test_cfb_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch(None, None, 'cfb')

        mock_get.assert_called_once_with(TestLinesScraper.CFB_URL)

    def test_specific_cfb_url(self, scraper, mocker):
        mock_get = mocker.patch.object(scraper.driver, "get", autospec=True)
        scraper.fetch("6", "2023", 'cfb')

        mock_get.assert_called_once_with(TestLinesScraper.SPECIFIC_CFB_URL)

    def test_scrape_data(self, mocked_scraper):
        data = mocked_scraper.parse_data()
        assert data['week'] == '6'
        games = data['games']
        first_game = games[0]
        assert first_game["away_team"] == {
            "name": "Broncos",
            "num": "111",
        }
        assert first_game["home_team"] == {
            "name": "Chiefs",
            "num": "112",
        }
        assert first_game["full_game"] == {
            "spread": "-10.5",
            "total": "u47.5",
        }
        last_game = games[-1]
        assert last_game["away_team"] == {
            "name": "Cowboys",
            "num": "277",
        }
        assert last_game["home_team"] == {
            "name": "Chargers",
            "num": "278",
        }
        assert last_game["full_game"] == {
            "spread": "+1.5",
            "total": "u50",
        }