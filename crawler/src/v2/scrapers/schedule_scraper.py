from selenium.webdriver.common.by import By
import re
from v2.scrapers.base_scraper import BaseScraper


def flatten_nested_list(nested_list):
    return [element for sublist in nested_list for element in sublist]


class ScheduleScraper(BaseScraper):
    def build_url(self, week, year):
        return (
            f"https://www.espn.com/nfl/schedule/_/week/{week}/year/{year}/seasontype/2"
        )

    def parse_data(self):
        return {"games": self.get_game_ids()}

    def get_game_ids(self):
        tables = self.driver.find_elements(By.CSS_SELECTOR, ".ScheduleTables")
        table_ids = [self.get_table_game_ids(table) for table in tables]
        return flatten_nested_list(table_ids)

    def get_table_game_ids(self, table):
        games = table.find_elements(By.CSS_SELECTOR, "tbody tr")
        return [self.get_game_id(game) for game in games]

    def get_game_id(self, game):
        game_column = game.find_elements(By.CSS_SELECTOR, "td")[2]
        anchor = game_column.find_element(By.CSS_SELECTOR, "a")
        file_path = anchor.get_attribute("href")
        return re.search(r"gameId=(\d+)", file_path).group(1)
