from scrapers.abstract import AbstractScraper
from scrapers.websites import BASKETBALL_REFERENCE_URL
from models.nba.stat import NbaStat

class NbaStatScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASKETBALL_REFERENCE_URL)

    def get_resource(self, args):
        away_team = args["away_team"]
        home_team = args["home_team"]
        game_url = args["game_url"]
        endpoint = f"boxscores/{game_url}.html"
        self.get(endpoint)
        away_basic = self.find_element(f"#box-{away_team}-game-basic")
        away_advanced = self.find_element(f"#box-{away_team}-game-advanced")
        home_basic = self.find_element(f"#box-{home_team}-game-basic")
        home_advanced = self.find_element(f"#box-{home_team}-game-advanced")

        def get_team_stats(basic_stats_table, advanced_stats_table):
            css_config = {"section": "tfoot", "cells": "th, td"}
            basic_row = self.get_table_rows(basic_stats_table, css_config)[0]
            advanced_row = self.get_table_rows(advanced_stats_table, css_config)[0]
            row = basic_row + advanced_row
            team_stat = NbaStat("Team", row).toJson()
            return [team_stat]

        def get_player_stats(basic_stats_table, advanced_stats_table):
            css_config = {"rows": "tr:not(.thead)", "cells": "th, td"}
            basic_rows = self.get_table_rows(basic_stats_table, css_config)
            advanced_rows = self.get_table_rows(advanced_stats_table, css_config)
            player_stats = []
            for basic_row, advanced_row in zip(basic_rows, advanced_rows):
                if len(basic_row) <= 2:
                    continue
                row = basic_row + advanced_row
                player_stat = NbaStat("Player", row).toJson()
                player_stats.append(player_stat)
            return player_stats

        away_player_stats = get_player_stats(away_basic, away_advanced)
        home_player_stats = get_player_stats(home_basic, home_advanced)
        away_team_stats = get_team_stats(away_basic, away_advanced)
        home_team_stats = get_team_stats(home_basic, home_advanced)
        return {
            "away_player_stats": away_player_stats,
            "home_player_stats": home_player_stats,
            "away_team_stats": away_team_stats,
            "home_team_stats": home_team_stats,
        }
