from scrapers.baseball_reference import BaseballReferenceScraper
from models.mlb.player import MlbPlayer


class MlbPlayerScraper(BaseballReferenceScraper):
    def get_resource(self, args):
        season = args["season"]
        team = args["team"]
        self.get(f"teams/{team}/{season}.shtml")
        players_table = self.find_element("#team_batting")
        table_rows = self.get_table_rows(players_table)
        players = [MlbPlayer(row).toJson() for row in table_rows]
        return {"players": players}
