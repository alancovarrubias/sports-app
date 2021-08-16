from scrapers.baseball_press import BaseballPressScraper
from selenium.webdriver.common.by import By
from models.mlb.lineup import MlbLineup


def get_players(col):
    players = col.find_elements(By.CLASS_NAME, "player")
    return [player.text for player in players]


class MlbLineupScraper(BaseballPressScraper):
    def get_resource(self, args):
        date = args["date"]
        endpoint = f"lineups/{date}"
        self.get(endpoint)
        lineups = self.driver.find_elements(By.CLASS_NAME, "lineup-card")
        data = [MlbLineup(lineup).toJson() for lineup in lineups]
        return {"lineups": data}
