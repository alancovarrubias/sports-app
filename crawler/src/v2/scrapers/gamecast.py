from v2.scrapers.base import BaseScraper
import re

class GamecastScraper(BaseScraper):
    AWAY_INDEX = 0
    HOME_INDEX = 1

    def parse_data(self):
        print(self.driver.current_url)
        return {
            "start_time": self.get_start_time(),
            "away_team": {
                "name": self.get_team_name(GamecastScraper.AWAY_INDEX),
            },
            "home_team": {
                "name": self.get_team_name(GamecastScraper.HOME_INDEX),
            }
        }

    def get_start_time(self):
        return self.wait_for("h4").text

    def get_team_name(self, away_home):
        texts = [x.text for x in self.find_element(".Gamestrip__Container").find_elements("a")]
        return [s for s in texts if s != ""][away_home]

