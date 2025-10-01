from v2.scrapers.base import BaseScraper
import re

class BoxscoreScraper(BaseScraper):
    AWAY_INDEX = 0
    HOME_INDEX = 1

    def parse_data(self):
        if "boxscore" not in self.driver.current_url:
            return {}
        return {
            "game_clock": self.get_game_clock(),
            "away_team": self.team_stats(BoxscoreScraper.AWAY_INDEX),
            "home_team": self.team_stats(BoxscoreScraper.HOME_INDEX)
        }

    def get_game_clock(self):
        container = self.wait_for(".Gamestrip__Container").text.split("\n")
        game_clock = container[4]
        if ':' in game_clock:
            quarter = container[6]
            return f"{game_clock} {quarter}"
        return game_clock

    def team_stats(self, away_home):
        return {
            "score": self.get_score(away_home),
            "comp_att": self.get_data(away_home, 0, 0),
            "passing_yards": self.get_data(away_home, 2, 1),
            "carries": self.get_data(away_home, 1, 0),
            "rushing_yards": self.get_data(away_home, 1, 1),
            "longest_rush": self.get_data(away_home, 1, 3),
            "longest_pass": self.get_data(away_home, 2, 3),
        }

    def get_score(self, away_home):
        container = self.wait_for(".Gamestrip__Container").text.split("\n")
        index = 3 if away_home == BoxscoreScraper.AWAY_INDEX else 8
        return container[index]


    def get_team_name(self, away_home):
        index = 0 if away_home == BoxscoreScraper.AWAY_INDEX else 6
        return self.wait_for(".Gamestrip__Container").text.split("\n")[index]

    def get_abbr(self, away_home):
        container = self.wait_for(".Gamestrip__Container")
        return len(container.find_elements("a"))

    def get_data(self, home_away, pass_rush, data_index):
        category = self.get_category(pass_rush)
        category_tables = self.get_tables(category, home_away)
        return self.get_data_item(category_tables, data_index)

    def categories(self):
        return self.find_elements(".Boxscore__Category")

    def get_category(self, index):
        return self.categories()[index]

    def get_tables(self, category, home_away):
        return category.find_elements(".Boxscore__Team")[home_away]

    def get_data_item(self, table, data_index):
        boxscore_totals = table.find_elements(".Boxscore__Totals")
        if (len(boxscore_totals) == 0):
            return ""
        data_row = boxscore_totals[1]
        data = data_row.find_elements(".Boxscore__Totals_Items")
        return data[data_index].text

    def get_scores(self, away_home):
        game_table = self.find_element(".Gamestrip__Table")
        body = game_table.find_element(".Table__TBODY")
        rows = body.find_elements(".Table__TR")
        elements = rows[away_home].find_elements(".Table__TD")
        return [elem.text for elem in elements]
