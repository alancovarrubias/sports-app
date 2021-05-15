from scrapers.basketball_reference import BasketballReferenceScraper
from models.nba.team import NbaTeam


class NbaTeamScraper(BasketballReferenceScraper):
    def get_resource(self, args):
        season = args["season"]
        endpoint = f"leagues/NBA_{season}_standings.html"
        self.get(endpoint)
        teams_table = self.find_element("#team_vs_team")
        table_rows = self.get_table_rows(teams_table)
        teams = [NbaTeam(row).toJson() for row in table_rows]
        return {"teams": teams}
