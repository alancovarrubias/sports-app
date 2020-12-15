from scrapers.mlb.base import MlbBaseScraper
from models.mlb.player import MlbPlayer


class MlbPlayersScraper(MlbBaseScraper):
    def get_resource(self, args):
        season = args["season"]
        team = args["team"]
        endpoint = f"teams/{team}/{season}.shtml"
        css_selectors = ("#team_batting",)
        players_table = self.get_tables(endpoint, css_selectors)[0]
        table_rows = self.get_table_rows(players_table)
        players = [MlbPlayer(row).toJson() for row in table_rows]
        return {"players": players}
