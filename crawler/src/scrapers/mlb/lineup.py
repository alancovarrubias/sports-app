from selenium.webdriver.common.by import By
from scrapers.abstract import AbstractScraper
from scrapers.websites import BASEBALL_PRESS_URL
from models.mlb.lineup import MlbLineup


class MlbLineupScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASEBALL_PRESS_URL)

    def get_resource(self, args):
        date = args["date"]
        endpoint = f"lineups/{date}"
        self.get(endpoint)
        lineups = self.driver.find_elements(By.CLASS_NAME, "lineup-card")
        data = [MlbLineup(lineup).toJson() for lineup in lineups]
        return {"lineups": data}
