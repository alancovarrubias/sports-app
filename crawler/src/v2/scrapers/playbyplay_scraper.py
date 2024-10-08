from selenium.webdriver.common.by import By
from v2.scrapers.base_scraper import BaseScraper
import re


class PlaybyplayScraper(BaseScraper):
    def build_url(self, game_id, league, finished):
        sport = self.get_sport(league)
        self.logo_index = 0 if finished else -1
        return f"https://www.espn.com/{sport}/playbyplay/_/gameId/{game_id}"

    def parse_data(self):
        return {
            "received": self.get_received()
        }

    def get_received(self):
        team_logos = self.driver.find_elements(By.CSS_SELECTOR, ".Gamestrip__Logo")
        return team_logos[self.logo_index].get_attribute("alt")
