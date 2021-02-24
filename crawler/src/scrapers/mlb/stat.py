import re
from const.mlb import PITCHING, BATTING
from const.models import TEAM, PLAYER
from selenium.webdriver.common.by import By
from scrapers.mlb.base import MlbBaseScraper
from models.mlb.stat import MlbStat
from models.mlb.play import MlbPlay
import re

WORD_REGEX = r"[^\w]"


class MlbStatScraper(MlbBaseScraper):
    def get_resource(self, args):
        game_url = args["game_url"]
        away_team = re.sub(WORD_REGEX, "", args["away_team"])
        home_team = re.sub(WORD_REGEX, "", args["home_team"])
        endpoint = f"boxes/{game_url[0:3]}/{game_url}.shtml"
        css_selectors = (
            f"#{away_team}batting",
            f"#{away_team}pitching",
            f"#{home_team}batting",
            f"#{home_team}pitching",
        )
        self.get(endpoint)
        stats_tables = self.find_elements(css_selectors)
        time = (
            self.find_element(".scorebox_meta")
            .find_elements(By.CSS_SELECTOR, "div")[1]
            .text
        )
        away_tables = stats_tables[:2]
        home_tables = stats_tables[2:]

        play_table = self.find_element("#play_by_play")
        play_config = {
            "rows": "tr:not(.pbp_summary_top):not(.pbp_summary_bottom)",
        }
        plays = []
        play_rows = self.get_table_rows(play_table, play_config)
        for play_row in play_rows:
            if len(play_row) != 11:
                continue
            play = MlbPlay(play_row)
            plays.append(play.toJson())

        def get_team_stat(tables):
            batting_table, pitching_table = tables
            team_config = {"section": "tfoot", "cells": "th, td"}
            pitching_row = self.get_table_rows(pitching_table, team_config)[0]
            batting_row = self.get_table_rows(batting_table, team_config)[0]
            team_pitching_stat = MlbStat(PITCHING, TEAM, pitching_row)
            team_batting_stat = MlbStat(BATTING, TEAM, batting_row)
            return [team_batting_stat.toJson(), team_pitching_stat.toJson()]

        def get_player_stats(tables):
            batting_table, pitching_table = tables
            player_config = {
                "rows": "tr:not(.spacer)",
                "cells": "th, td",
            }
            batting_rows = self.get_table_rows(batting_table, player_config)
            pitching_rows = self.get_table_rows(pitching_table, player_config)
            pitching_stats = []
            for pitching_row in pitching_rows:
                pitching_stat = MlbStat(PITCHING, PLAYER, pitching_row)
                pitching_stats.append(pitching_stat.toJson())
            batting_stats = []
            for batting_row in batting_rows:
                if batting_row[0].text == "Batting":
                    continue
                batting_stat = MlbStat(BATTING, PLAYER, batting_row)
                batting_stats.append(batting_stat.toJson())
            return batting_stats + pitching_stats

        away_player_stats = get_player_stats(away_tables)
        home_player_stats = get_player_stats(home_tables)
        away_team_stats = get_team_stat(away_tables)
        home_team_stats = get_team_stat(home_tables)
        return {
            "time": time,
            "away_player_stats": away_player_stats,
            "home_player_stats": home_player_stats,
            "away_team_stats": away_team_stats,
            "home_team_stats": home_team_stats,
            "plays": plays,
        }
