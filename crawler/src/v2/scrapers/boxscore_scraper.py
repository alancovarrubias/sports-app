from selenium.webdriver.common.by import By
from v2.scrapers.base_scraper import BaseScraper


class BoxscoreScraper(BaseScraper):
    AWAY_INDEX = 0
    HOME_INDEX = 1

    def build_url(self, game_id):
        return f"https://www.espn.com/nfl/boxscore/_/gameId/{game_id}"

    def parse_data(self):
        if "boxscore" in self.driver.current_url:
            return {
                "game": {
                    "start_time": self.get_start_time(),
                    "game_clock": self.get_game_clock(),
                    "away_team": self.team_stats(BoxscoreScraper.AWAY_INDEX),
                    "home_team": self.team_stats(BoxscoreScraper.HOME_INDEX),
                }
            }
        else:
            return {
                "game": {
                    "start_time": self.get_start_time(),
                    "game_clock": "Not Started",
                    "away_team": {
                        "name": self.get_team_name(BoxscoreScraper.AWAY_INDEX),
                    },
                    "home_team": {
                        "name": self.get_team_name(BoxscoreScraper.HOME_INDEX),
                    }
                }
            }

    def get_start_time(self):
        date = self.driver.find_element(By.CSS_SELECTOR, ".GameInfo__Meta :first-child")
        return date.text

    def get_game_clock(self):
        time = self.driver.find_element(By.CSS_SELECTOR, ".Gamestrip__Time")
        return time.text

    def team_stats(self, away_home):
        return {
            "name": self.get_team_name(away_home),
            "abbr": self.get_abbr(away_home),
            "comp_att": self.get_data(away_home, 0, 0),
            "passing_yards": self.get_data(away_home, 0, 1),
            "carries": self.get_data(away_home, 1, 0),
            "rushing_yards": self.get_data(away_home, 1, 1),
        }

    def get_team_name(self, away_home):
        team_logos = self.driver.find_elements(By.CSS_SELECTOR, ".Gamestrip__Logo")
        return team_logos[away_home].get_attribute("alt")

    def get_abbr(self, away_home):
        return self.get_scores(away_home)[0]

    def get_data(self, home_away, pass_rush, data_index):
        category = self.get_category(pass_rush)
        category_tables = self.get_tables(category, home_away)
        data_item = self.get_data_item(category_tables, data_index)
        return data_item.text

    def get_category(self, index):
        return self.driver.find_elements(By.CSS_SELECTOR, ".Boxscore__Category")[index]

    def get_tables(self, category, home_away):
        return category.find_elements(By.CSS_SELECTOR, ".Boxscore__Team")[home_away]

    def get_data_item(self, table, data_index):
        data_row = table.find_elements(By.CSS_SELECTOR, ".Boxscore__Totals")[1]
        data = data_row.find_elements(By.CSS_SELECTOR, ".Boxscore__Totals_Items")
        return data[data_index]

    def get_scores(self, away_home):
        game_table = self.driver.find_element(By.CSS_SELECTOR, ".Gamestrip__Table")
        body = game_table.find_element(By.CSS_SELECTOR, ".Table__TBODY")
        rows = body.find_elements(By.CSS_SELECTOR, ".Table__TR")
        elements = rows[away_home].find_elements(By.CSS_SELECTOR, ".Table__TD")
        return [elem.text for elem in elements]
