from selenium.webdriver.common.by import By
from scrapers.abstract import AbstractScraper
from scrapers.websites import BASEBALL_REFERENCE_URL
from models.mlb.game import MlbGame
import re

TEAM_LINK_REGEX = r"[A-Z]{3}"
class MlbGameScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASEBALL_REFERENCE_URL)

    def get_resource(self, args):
        season = args["season"]
        team = args["team"]

        endpoint = f"teams/{team}/{season}-schedule-scores.shtml"
        self.get(endpoint)
        games_table = self.find_element("#team_schedule")
        rows = self.get_table_rows(games_table, {"rows": "tr:not(.thead)"})
        home_rows = list(filter(lambda row: row[3].text != "@", rows))
        home_games = [MlbGame(row).toJson() for row in home_rows]
        game_link = (
            home_rows[0][1].find_element(By.TAG_NAME, "a").get_attribute("href")
        )
        team_link = re.search(TEAM_LINK_REGEX, game_link).group()

        return {"games": home_games, "team_link": team_link}
