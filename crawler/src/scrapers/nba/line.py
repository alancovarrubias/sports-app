from scrapers.sports_book_review import SportsBookReviewScraper
from selenium.webdriver.common.by import By


class NbaLineScraper(SportsBookReviewScraper):
    def get_resource(self, args):
        season = args["season"]
        date = args["date"]
        endpoint = f"betting-odds/nba-basketball/totals?date={date}"
        self.get(endpoint)
        elements = self.driver.find_elements(By.CLASS_NAME, "opener-1VWzR")
        openers = [el.find_element(By.CLASS_NAME, "adjust-1uDgI").text for el in elements]
        elements = self.driver.find_elements(By.CLASS_NAME, "participantBox-3ar9Y")
        teams = [el.text for el in elements]
        return {"openers": openers, "teams": teams}