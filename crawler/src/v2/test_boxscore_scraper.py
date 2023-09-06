import pytest
from boxscore_scraper import BoxscoreScraper


class TestMatchup:
    @pytest.fixture(scope="class")
    def scraper(self):
        with BoxscoreScraper() as scraper:
            yield scraper

    def test_away_comp_att(self, scraper):
        assert scraper.get_away_comp_att() == "15/27"

    def test_away_passing_yards(self, scraper):
        assert scraper.get_away_passing_yards() == "104"

    def test_away_carries(self, scraper):
        assert scraper.get_away_carries() == "31"

    def test_away_rushing_yards(self, scraper):
        assert scraper.get_away_rushing_yards() == "131"

    def test_home_comp_att(self, scraper):
        assert scraper.get_home_comp_att() == "28/54"

    def test_home_passing_yards(self, scraper):
        assert scraper.get_home_passing_yards() == "257"

    def test_home_carries(self, scraper):
        assert scraper.get_home_carries() == "21"

    def test_home_rushing_yards(self, scraper):
        assert scraper.get_home_rushing_yards() == "91"

    def test_game_time(self, scraper):
        assert scraper.get_game_time() == "Final"

    def test_away_scores(self, scraper):
        assert scraper.get_away_scores() == ["HOU", "7", "3", "7", "0", "17"]

    def test_home_scores(self, scraper):
        assert scraper.get_home_scores() == ["NO", "0", "7", "3", "3", "13"]

    def test_away_team(self, scraper):
        assert scraper.get_away_team() == "Houston Texans"

    def test_home_team(self, scraper):
        assert scraper.get_home_team() == "New Orleans Saints"

    def test_game_time(self, scraper):
        assert scraper.get_game_time() == "12:00 AM, August 28, 2023"
