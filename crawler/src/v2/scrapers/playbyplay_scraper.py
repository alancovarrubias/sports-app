from selenium.webdriver.common.by import By
from v2.scrapers.base_scraper import BaseScraper
import re


class PlaybyplayScraper(BaseScraper):
    def build_url(self, game_id):
        return f"https://www.espn.com/nfl/playbyplay/_/gameId/{game_id}"

    def parse_data(self):
        return {
            "game": {
                "kicked": self.get_kicked()
            }
        }

    def get_kicked(self):
        plays = self.driver.find_elements(By.CSS_SELECTOR, ".PlayListItem__Description")
        text = plays[0].text
        pattern = r'\b[A-Z]{2,3}\b'
        matches = re.findall(pattern, text)
        return matches[0]

