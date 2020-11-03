import re
from crawlers.abstract import AbstractScraper
from crawlers.helpers import get_table_rows
from models.nba.stat import NbaStat


class NbaStatsScraper(AbstractScraper):
    def get_resource(self):
        away_team = self.key_store.args['away_team']
        home_team = self.key_store.args['home_team']
        game_url = self.key_store.args['game_url']
        endpoint = f'boxscores/{game_url}.html'
        css_selectors = (
            f'#box-{away_team}-game-basic',
            f'#box-{away_team}-game-advanced',
            f'#box-{home_team}-game-basic',
            f'#box-{home_team}-game-advanced'
        )
        stat_tables = self.get_tables(endpoint, css_selectors)
        away_tables = stat_tables[:2]
        home_tables = stat_tables[2:]

        def get_team_stats(tables):
            basic_stats_table, advanced_stats_table = tables
            css_config = {'section': 'tfoot', 'cells': 'th, td'}
            basic_row = get_table_rows(basic_stats_table, css_config)[0]
            advanced_row = get_table_rows(advanced_stats_table, css_config)[0]
            row = basic_row + advanced_row
            team_stat = NbaStat('Team', row).toJson()
            return [team_stat]

        def get_player_stats(tables):
            basic_stats_table, advanced_stats_table = tables
            css_config = {'rows': 'tr:not(.thead)', 'cells': 'th, td'}
            basic_rows = get_table_rows(basic_stats_table, css_config)
            advanced_rows = get_table_rows(advanced_stats_table, css_config)
            player_stats = []
            for basic_row, advanced_row in zip(basic_rows, advanced_rows):
                if len(basic_row) <= 2:
                    continue
                row = basic_row + advanced_row
                player_stat = NbaStat('Player', row).toJson()
                player_stats.append(player_stat)
            return player_stats

        away_player_stats = get_player_stats(away_tables)
        home_player_stats = get_player_stats(home_tables)
        away_team_stats = get_team_stats(away_tables)
        home_team_stats = get_team_stats(home_tables)
        return {'away_player_stats': away_player_stats, 'home_player_stats': home_player_stats, 'away_team_stats': away_team_stats, 'home_team_stats': home_team_stats}
