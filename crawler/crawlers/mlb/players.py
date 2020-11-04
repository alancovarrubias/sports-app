import re
from crawlers.abstract import AbstractScraper
from crawlers.helpers import get_table_rows
from models.mlb.player import MlbPlayer


class MlbPlayersScraper(AbstractScraper):
    def get_resource(self):
        season = self.key_store.args['season']
        team = self.key_store.args['team']
        endpoint = f'teams/{team}/{season}.shtml'
        css_selectors = ('#team_batting',)
        players_table = self.get_tables(endpoint, css_selectors)[0]
        table_rows = get_table_rows(players_table)
        players = list(map(lambda row: MlbPlayer(row).toJson(), table_rows))
        return {'players': players}