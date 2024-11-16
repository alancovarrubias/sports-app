from v2.scrapers.base_scraper import BaseScraper
from v2.url_builders.espn import EspnUrlBuilder
import re


class PlaybyplayScraper(BaseScraper):
    def build_url(self, game_id, league, finished):
        self.logo_index = 0 if finished else -1
        return EspnUrlBuilder(league).playbyplay_url(game_id)

    def parse_data(self):
        return {
            "received": self.get_received()
        }

    def get_received(self):
        team_logos = self.find_elements(".Gamestrip__Logo")
        return team_logos[self.logo_index].get_attribute("alt")
