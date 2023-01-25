from scrapers.abstract import AbstractScraper
from scrapers.websites import BASKETBALL_REFERENCE_URL
from models.nba.team import NbaTeam


class NbaTeamScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASKETBALL_REFERENCE_URL)

    def get_resource(self, args):
        season = args["season"]
        endpoint = f"leagues/NBA_{season}_standings.html"
        self.get(endpoint)
        teams_table = self.find_element("#team_vs_team")
        table_rows = self.get_table_rows(teams_table)
        teams = [NbaTeam(row).toJson() for row in table_rows]
        return {"teams": teams}
