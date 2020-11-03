import re
from crawlers.helpers import get_table_rows
from crawlers.abstract import AbstractScraper
from models.nba.player import NbaPlayer


class NbaPlayersScraper(AbstractScraper):
    def get_resource(self):
        season = self.key_store.args['season']
        team = self.key_store.args['team']
        endpoint = f'teams/{team}/{season}.html'
        css_selectors = ('#roster',)
        players_table = self.get_tables(endpoint, css_selectors)[0]
        table_rows = get_table_rows(players_table)
        players = list(map(lambda row: NbaPlayer(row).toJson(), table_rows))
        return {'players': players}
