from selenium.webdriver.common.by import By
from scrapers.abstract import AbstractScraper
from scrapers.websites import SPORTS_BOOK_REVIEW_URL

class NbaLineScraper(AbstractScraper):
    def __init__(self):
        super().__init__(SPORTS_BOOK_REVIEW_URL)

    def get_resource(self, args):
        date = args["date"]
        endpoint = f"betting-odds/nba-basketball/totals?date={date}"
        self.get(endpoint)
        self.driver.implicitly_wait(15)
        elements = self.driver.find_elements(By.CLASS_NAME, "participantBox-3ar9Y")
        teams = [el.text for el in elements]
        elements = self.driver.find_elements(By.CSS_SELECTOR, ".opener.adjust-1uDgI")[
            0::2
        ]
        totals = [e.text for e in elements]
        self.driver.implicitly_wait(15)
        self.get(f"betting-odds/nba-basketball/pointspread?date={date}")
        elements = self.driver.find_elements(By.CSS_SELECTOR, ".opener.adjust-1uDgI")[
            0::2
        ]
        spreads = [e.text for e in elements]
        return {"teams": teams, "totals": totals, "spreads": spreads}