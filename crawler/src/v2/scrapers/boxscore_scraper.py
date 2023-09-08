from selenium.webdriver.common.by import By
from v2.scrapers.base_scraper import BaseScraper


class BoxscoreScraper(BaseScraper):
    def build_url(self, game_id):
        return f"https://www.espn.com/nfl/boxscore/_/gameId/{game_id}"

    def get_away_comp_att(self):
        return self.get_data(0, 0, 0)

    def get_away_passing_yards(self):
        return self.get_data(0, 0, 1)

    def get_away_carries(self):
        return self.get_data(1, 0, 0)

    def get_away_rushing_yards(self):
        return self.get_data(1, 0, 1)

    def get_home_comp_att(self):
        return self.get_data(0, 1, 0)

    def get_home_passing_yards(self):
        return self.get_data(0, 1, 1)

    def get_home_carries(self):
        return self.get_data(1, 1, 0)

    def get_home_rushing_yards(self):
        return self.get_data(1, 1, 1)

    def get_data(self, pass_rush, home_away, data_index):
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

    def get_game_time(self):
        time = self.driver.find_element(By.CSS_SELECTOR, ".Gamestrip__Time")
        return time.text

    def get_away_team(self):
        return self.get_team(0)

    def get_home_team(self):
        return self.get_team(1)

    def get_team(self, away_home):
        team_logos = self.driver.find_elements(By.CSS_SELECTOR, ".Gamestrip__Logo")
        return team_logos[away_home].get_attribute("alt")

    def get_away_scores(self):
        return self.get_scores(0)

    def get_home_scores(self):
        return self.get_scores(1)

    def get_scores(self, away_home):
        game_table = self.driver.find_element(By.CSS_SELECTOR, ".Gamestrip__Table")
        body = game_table.find_element(By.CSS_SELECTOR, ".Table__TBODY")
        rows = body.find_elements(By.CSS_SELECTOR, ".Table__TR")
        elements = rows[away_home].find_elements(By.CSS_SELECTOR, ".Table__TD")
        return [elem.text for elem in elements]

    def get_game_time(self):
        date = self.driver.find_element(By.CSS_SELECTOR, ".GameInfo__Meta :first-child")
        return date.text
