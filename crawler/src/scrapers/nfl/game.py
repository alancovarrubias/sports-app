from selenium.webdriver.common.by import By
from scrapers.abstract import AbstractScraper
from scrapers.websites import ESPN_URL
from models.nfl.game import NflGame


class NflGameScraper(AbstractScraper):
    def __init__(self):
        super().__init__(ESPN_URL)

    def get_resource(self, args):
        season = args["season"]
        week = args["week"]
        season_type = args["season_type"]
        endpoint = f"nfl/schedule/_/week/{week}/year/{season}/seasontype/{season_type}"
        self.get(endpoint)
        game_tables = self.driver.find_elements(By.CSS_SELECTOR, ".Table")
        dates = [
            date.text
            for date in self.driver.find_elements(By.CSS_SELECTOR, ".Table__Title")
        ]
        games = []
        for (game_table, date) in zip(game_tables, dates):
            game_rows = self.get_table_rows(game_table)
            games += [NflGame(row, date).toJson() for row in game_rows]

        return {"endpoint": games}
