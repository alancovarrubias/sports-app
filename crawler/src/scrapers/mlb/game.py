from scrapers.baseball_reference import BaseballReferenceScraper
from models.mlb.game import MlbGame
import re


TEAM_LINK_REGEX = r"[A-Z]{3}"


class MlbGameScraper(BaseballReferenceScraper):
    def get_resource(self, args):

        season = args["season"]
        teams = args["teams"].split(",")

        games = []
        team_links = {}
        for team in teams:
            endpoint = f"teams/{team}/{season}-schedule-scores.shtml"
            self.get(endpoint)
            games_table = self.find_element("#team_schedule")
            rows = self.get_table_rows(games_table, {"rows": "tr:not(.thead)"})
            home_rows = list(filter(lambda row: row[3].text != "@", rows))
            home_games = [MlbGame(row).toJson() for row in home_rows]
            game_link = (
                home_rows[0][1].find_element_by_tag_name("a").get_attribute("href")
            )
            team_links[team] = re.search(TEAM_LINK_REGEX, game_link).group()

            games += home_games

        return {"games": games, "team_links": team_links}
