from selenium.webdriver.common.by import By
import re
from scraper import Scraper


def flatten_nested_list(nested_list):
    return [element for sublist in nested_list for element in sublist]


class ScheduleScraper(Scraper):
    URL = "https://www.espn.com/nfl/schedule/_/week/1/year/2023/seasontype/2"
    CACHE = "schedule.html"

    def __init__(self):
        super().__init__(ScheduleScraper.URL, ScheduleScraper.CACHE)

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
