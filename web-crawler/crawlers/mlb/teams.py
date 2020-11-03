import re
from crawlers.abstract import AbstractScraper
from crawlers.helpers import get_table_rows
from models.mlb.team import MlbTeam


class MlbTeamsScraper(AbstractScraper):
    def get_resource(self):
        season = self.key_store.args['season']
        endpoint = f'leagues/MLB/{season}.shtml'
        css_selectors = ('#teams_standard_batting',)
        teams_table = self.get_tables(endpoint, css_selectors)[0]
        table_rows = get_table_rows(teams_table, {'cells': 'th'})[:-1]
        teams = list(map(lambda row: MlbTeam(row).toJson(), table_rows))
        return {'teams': teams}