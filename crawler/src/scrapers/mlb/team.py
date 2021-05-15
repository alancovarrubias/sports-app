from scrapers.baseball_reference import BaseballReferenceScraper
from models.mlb.team import MlbTeam


class MlbTeamScraper(BaseballReferenceScraper):
    def get_resource(self, args):
        season = args["season"]
        endpoint = f"leagues/MLB/{season}.shtml"
        self.get(endpoint)
        teams_table = self.find_element("#teams_standard_batting")
        table_rows = self.get_table_rows(teams_table, {"cells": "th"})[:-1]
        teams = [MlbTeam(row).toJson() for row in table_rows]
        return {"teams": teams}
