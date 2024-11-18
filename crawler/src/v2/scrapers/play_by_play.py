from v2.scrapers.base import BaseScraper

class PlayByPlayScraper(BaseScraper):
    def parse_data(self, finished):
        return {
            "received": self.get_received(0 if finished else -1)
        }

    def get_received(self, logo_index):
        team_logos = self.find_elements(".Gamestrip__Logo")
        return team_logos[logo_index].get_attribute("alt")
