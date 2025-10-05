from v2.scrapers.base import BaseScraper

class PlayByPlayScraper(BaseScraper):
    def parse_data(self, finished):
        print(self.driver.current_url)
        return {
            "received": self.get_received(1)
        }

    def get_received(self, logo_index):
        team_logos = self.find_element("div[role='tabpanel']").find_elements("img")
        return team_logos[logo_index].get_attribute("alt")
