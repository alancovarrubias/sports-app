from v2.scrapers.base_scraper import BaseScraper
from v2.url_builders.espn import EspnUrlBuilder
import re


class BoxscoreScraper(BaseScraper):
    AWAY_INDEX = 0
    HOME_INDEX = 1

    def build_url(self, game_id, league):
        return EspnUrlBuilder(league).boxscore_url(game_id)

    def parse_data(self):
        if "boxscore" in self.driver.current_url and len(self.categories()) > 0:
            return {
                "start_time": self.get_start_time(),
                "game_clock": self.get_game_clock(),
                "away_team": self.team_stats(BoxscoreScraper.AWAY_INDEX),
                "home_team": self.team_stats(BoxscoreScraper.HOME_INDEX),
            }
        return {
            "start_time": self.get_start_time(),
            "game_clock": "Not Started",
            "away_team": {
                "name": self.get_team_name(BoxscoreScraper.AWAY_INDEX),
            },
            "home_team": {
                "name": self.get_team_name(BoxscoreScraper.HOME_INDEX),
            }
        }

    def get_start_time(self):
        return self.wait_for(".GameInfo__Meta :first-child").text

    def get_game_clock(self):
        time = self.find_element(".Gamestrip__Time")
        return time.text

    def team_stats(self, away_home):
        return {
            "name": self.get_team_name(away_home),
            "abbr": self.get_abbr(away_home),
            "score": self.get_score(away_home),
            "comp_att": self.get_data(away_home, 0, 0),
            "passing_yards": self.get_data(away_home, 2, 1),
            "carries": self.get_data(away_home, 1, 0),
            "rushing_yards": self.get_data(away_home, 1, 1),
            "longest_rush": self.get_data(away_home, 1, 3),
            "longest_pass": self.get_data(away_home, 2, 3),
        }

    def get_score(self, away_home):
        scores = self.find_elements(".Gamestrip__Score")
        match = re.search(r'\d{1,2}', scores[away_home].text)
        return match.group()

    def get_team_name(self, away_home):
        team_logos = self.find_elements(".Gamestrip__Logo")
        team_name = team_logos[away_home].get_attribute("alt")
        if team_name:
            return team_name
        team_logos = self.find_elements(".Gamestrip__Truncate")
        return team_logos[away_home].text

    def get_abbr(self, away_home):
        return self.get_scores(away_home)[0]

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
