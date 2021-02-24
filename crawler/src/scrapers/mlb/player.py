from scrapers.mlb.base import MlbBaseScraper
from models.mlb.player import MlbPlayer


class MlbPlayerScraper(MlbBaseScraper):
    def get_resource(self, args):
        season = args["season"]
        team = args["team"]
        endpoint = f"teams/{team}/{season}.shtml"
        css_selectors = ("#team_batting",)
        self.get(endpoint)
        players_table = self.find_elements(css_selectors)[0]
        table_rows = self.get_table_rows(players_table)
        players = [MlbPlayer(row).toJson() for row in table_rows]
        return {"players": players}
