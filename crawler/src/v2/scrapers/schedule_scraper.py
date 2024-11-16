from v2.scrapers.base_scraper import BaseScraper
from v2.url_builders.espn import EspnUrlBuilder
import re


def flatten_nested_list(nested_list):
    return [element for sublist in nested_list for element in sublist]


class ScheduleScraper(BaseScraper):
    def build_url(self, week, year, league):
        return EspnUrlBuilder(league).schedule_url(week, year)

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
        is_active = self.find_elements(".custom--week.is-active")[0]
        url = is_active.find_element("a").get_attribute('href')
        return re.search(pattern, url).group(1)

    def get_game_ids(self):
        tables = self.find_elements(".ScheduleTables")
        table_ids = [self.get_table_game_ids(table) for table in tables]
        return flatten_nested_list(table_ids)

    def get_table_game_ids(self, table):
        games = table.find_elements("tbody tr")
        return [self.get_game_id(game) for game in games]

    def get_game_id(self, game):
        game_column = game.find_elements("td")[2]
        anchor = game_column.find_element("a")
        file_path = anchor.get_attribute("href")
        return re.search(r"gameId/(\d+)", file_path).group(1)
