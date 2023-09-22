from selenium.webdriver.common.by import By
from v2.scrapers.base_scraper import BaseScraper
import re


class PlaybyplayScraper(BaseScraper):
    def build_url(self, game_id):
        return f"https://www.espn.com/nfl/playbyplay/_/gameId/{game_id}"

    def parse_data(self):
        return {
            "game": {
                "received": self.get_received()
            }
        }

    def get_received(self):
        team_logos = self.driver.find_elements(By.CSS_SELECTOR, ".AccordionHeader__Left__TeamLogo")
        return team_logos[0].get_attribute("alt")
