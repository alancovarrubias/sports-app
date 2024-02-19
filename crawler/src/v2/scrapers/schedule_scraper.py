from selenium.webdriver.common.by import By
import re
from v2.scrapers.base_scraper import BaseScraper


def flatten_nested_list(nested_list):
    return [element for sublist in nested_list for element in sublist]


class ScheduleScraper(BaseScraper):
    def build_url(self, week, year, league):
        if league == 'nfl':
            return self.get_nfl_url(week, year)
        elif league == 'cfb80':
            return self.get_cfb_url(week, year, '80')
        elif league == 'cfb81':
            return self.get_cfb_url(week, year, '81')

    
    def get_nfl_url(self, week, year):
        if week is None and year is None:
            return "https://www.espn.com/nfl/schedule"
        else:
            return f"https://www.espn.com/nfl/schedule/_/week/{week}/year/{year}/seasontype/2"

    def get_cfb_url(self, week, year, num):
        if week is None and year is None:
            return f"https://www.espn.com/college-football/schedule/_/group/{num}"
        else:
            return f"https://www.espn.com/college-football/schedule/_/week/{week}/year/{year}/seasontype/2/group/{num}"

    def parse_data(self):
        return {
            "year": self.get_year(),
            "week": self.get_week(),
            "espn_ids": self.get_game_ids()
        }

    def get_year(self):
        return self.get_active_url(r'\/year\/(\d{4})\/')
    
    def get_week(self):
        return self.get_active_url(r'\/week\/(\d{1,2})\/')
    
    def get_active_url(self, pattern):
        is_active = self.driver.find_elements(By.CSS_SELECTOR, ".custom--week.is-active")[0]
        url = is_active.find_element(By.CSS_SELECTOR, "a").get_attribute('href')
        return re.search(pattern, url).group(1)

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
        return re.search(r"gameId/(\d+)", file_path).group(1)
