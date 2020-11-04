import re
from crawlers.abstract import AbstractScraper
from crawlers.helpers import get_table_rows
from models.mlb.game import MlbGame


class MlbGamesScraper(AbstractScraper):
    def get_resource(self):

        season = self.key_store.args['season']
        teams = self.key_store.args['teams'].split(',')

        games = []
        team_links = {}
        for team in teams:
            endpoint = f'teams/{team}/{season}-schedule-scores.shtml'
            css_selectors = ('#team_schedule',)
            games_table = self.get_tables(endpoint, css_selectors)[0]
            rows = get_table_rows(games_table, {'rows': 'tr:not(.thead)'})
            home_rows = list(filter(lambda row: row[3].text != '@', rows))
            home_games = list(
                map(lambda row: MlbGame(row).toJson(), home_rows))
            game_link = home_rows[0][1].find_element_by_tag_name(
                'a').get_attribute('href')
            team_links[team] = re.search(r"[A-Z]{3}", game_link).group()
            print(team_links)

            games += home_games

        return {'games': games, 'team_links': team_links}
