from scrapers.basketball_reference import BasketballReferenceScraper
from models.nba.player import NbaPlayer


class NbaPlayerScraper(BasketballReferenceScraper):
    def get_resource(self, args):
        season = args["season"]
        team = args["team"]
        endpoint = f"teams/{team}/{season}.html"
        css_selectors = ("#roster",)
        players_table = self.get_tables(endpoint, css_selectors)[0]
        table_rows = self.get_table_rows(players_table)
        players = [NbaPlayer(row).toJson() for row in table_rows]
        return {"players": players}
