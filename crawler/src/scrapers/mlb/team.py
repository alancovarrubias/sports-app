from scrapers.mlb.base import MlbBaseScraper
from models.mlb.team import MlbTeam


class MlbTeamScraper(MlbBaseScraper):
    def get_resource(self, args):
        season = args["season"]
        endpoint = f"leagues/MLB/{season}.shtml"
        css_selectors = ("#teams_standard_batting",)
        teams_table = self.get_tables(endpoint, css_selectors)[0]
        table_rows = self.get_table_rows(teams_table, {"cells": "th"})[:-1]
        teams = [MlbTeam(row).toJson() for row in table_rows]
        return {"teams": teams}
