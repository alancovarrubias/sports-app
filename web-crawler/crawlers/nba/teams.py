import re
from crawlers.abstract import AbstractScraper
from models.nba.team import NbaTeam
from crawlers.helpers import get_table_rows


class NbaTeamsScraper(AbstractScraper):
    def get_resource(self):
        season = self.key_store.args['season']
        endpoint = f'leagues/NBA_{season}_standings.html'
        css_selectors = ('#team_vs_team',)
        teams_table = self.get_tables(endpoint, css_selectors)[0]
        table_rows = get_table_rows(teams_table)
        teams = list(map(lambda row: NbaTeam(row).toJson(), table_rows))
        return {'teams': teams}
