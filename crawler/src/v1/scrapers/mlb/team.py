from scrapers.abstract import AbstractScraper
from scrapers.websites import BASEBALL_REFERENCE_URL
from models.mlb.team import MlbTeam

class MlbTeamScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASEBALL_REFERENCE_URL)

    def get_resource(self, args):
        season = args["season"]
        endpoint = f"leagues/MLB/{season}.shtml"
        self.get(endpoint)
        teams_table = self.find_element("#teams_standard_batting")
        table_rows = self.get_table_rows(teams_table, {"cells": "th"})[:-1]
        teams = [MlbTeam(row).toJson() for row in table_rows]
        return {"teams": teams}
