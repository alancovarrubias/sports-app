import re
from const.mlb import PITCHING, BATTING
from const.models import TEAM, PLAYER
from crawlers.abstract import AbstractScraper
from crawlers.helpers import get_table_rows
from models.mlb.stat import MlbStat


class MlbStatsScraper(AbstractScraper):
    def get_resource(self):
        game_url = self.key_store.args['game_url']
        away_team = self.key_store.args['away_team'].replace(' ', '')
        home_team = self.key_store.args['home_team'].replace(' ', '')
        endpoint = f'boxes/{game_url[0:3]}/{game_url}.shtml'
        css_selectors = (
            f'#{away_team}batting',
            f'#{away_team}pitching',
            f'#{home_team}batting',
            f'#{home_team}pitching'
        )
        stats_tables = self.get_tables(endpoint, css_selectors)
        away_tables = stats_tables[:2]
        home_tables = stats_tables[2:]

        def get_team_stat(tables):
            batting_table, pitching_table = tables
            css_config = {'section': 'tfoot', 'cells': 'th, td'}
            pitching_row = get_table_rows(pitching_table, css_config)[0]
            batting_row = get_table_rows(batting_table, css_config)[0]
            team_pitching_stat = MlbStat(PITCHING, TEAM, pitching_row)
            team_batting_stat = MlbStat(BATTING, TEAM, batting_row)
            return [team_batting_stat.toJson(), team_pitching_stat.toJson()]

        def get_player_stats(tables):
            batting_table, pitching_table = tables
            css_config = {'cells': 'th, td'}
            batting_rows = get_table_rows(batting_table, css_config)
            pitching_rows = get_table_rows(pitching_table, css_config)
            pitching_stats = []
            for pitching_row in pitching_rows:
                pitching_stat = MlbStat(PITCHING, PLAYER, pitching_row)
                pitching_stats.append(pitching_stat.toJson())
            batting_stats = []
            for batting_row in batting_rows:
                batting_stat = MlbStat(BATTING, PLAYER, batting_row)
                batting_stats.append(batting_stat.toJson())
            return batting_stats+pitching_stats

        away_player_stats = get_player_stats(away_tables)
        home_player_stats = get_player_stats(home_tables)
        away_team_stats = get_team_stat(away_tables)
        home_team_stats = get_team_stat(home_tables)
        return {'away_player_stats': away_player_stats, 'home_player_stats': home_player_stats, 'away_team_stats': away_team_stats, 'home_team_stats': home_team_stats}
