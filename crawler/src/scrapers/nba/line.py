from scrapers.sports_book_review import SportsBookReviewScraper
from selenium.webdriver.common.by import By


class NbaLineScraper(SportsBookReviewScraper):
    def get_resource(self, args):
        date = args["date"]
        endpoint = f"betting-odds/nba-basketball/totals?date={date}"
        self.get(endpoint)
        self.driver.implicitly_wait(15)
        elements = self.driver.find_elements(By.CLASS_NAME, "participantBox-3ar9Y")
        teams = [el.text for el in elements]
        elements = self.driver.find_elements(By.CLASS_NAME, "opener-1VWzR")
        totals = [e.find_element(By.CLASS_NAME, "adjust-1uDgI").text for e in elements]
        self.driver.implicitly_wait(15)
        self.get(f"betting-odds/nba-basketball/pointspread?date={date}")
        elements = self.driver.find_elements(By.CLASS_NAME, "opener-1VWzR")
        spreads = [
            e.find_element(By.CLASS_NAME, "margin-2SxKQ")
            .find_element(By.CLASS_NAME, "adjust-1uDgI")
            .text
            for e in elements
        ]
        return {"teams": teams, "totals": totals, "spreads": spreads}