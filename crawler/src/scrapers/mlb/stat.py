from selenium.webdriver.common.by import By
from scrapers.abstract import AbstractScraper
from scrapers.websites import BASEBALL_REFERENCE_URL
from const.mlb import PITCHING, BATTING
from const.models import TEAM, PLAYER
from models.mlb.stat import MlbStat
from models.mlb.play import MlbPlay
import re

WORD_REGEX = r"[^\w]"
class MlbStatScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASEBALL_REFERENCE_URL)

    def get_resource(self, args):
        game_url = args["game_url"]
        endpoint = f"boxes/{game_url[0:3]}/{game_url}.shtml"
        self.get(endpoint)
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
        time = (
            self.find_element(".scorebox_meta")
            .find_elements(By.CSS_SELECTOR, "div")[1]
            .text
        )
        away_team = re.sub(WORD_REGEX, "", args["away_team"])
        home_team = re.sub(WORD_REGEX, "", args["home_team"])
        away_team_batting = self.find_element(f"#{away_team}batting")
        away_team_pitching = self.find_element(f"#{away_team}pitching")
        home_team_batting = self.find_element(f"#{home_team}batting")
        home_team_pitching = self.find_element(f"#{home_team}pitching")

        def get_team_stat(batting_table, pitching_table):
            team_config = {"section": "tfoot", "cells": "th, td"}
            pitching_row = self.get_table_rows(pitching_table, team_config)[0]
            batting_row = self.get_table_rows(batting_table, team_config)[0]
            team_pitching_stat = MlbStat(PITCHING, TEAM, pitching_row)
            team_batting_stat = MlbStat(BATTING, TEAM, batting_row)
            return [team_batting_stat.toJson(), team_pitching_stat.toJson()]

        def get_player_stats(batting_table, pitching_table):
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

        away_player_stats = get_player_stats(away_team_batting, away_team_pitching)
        home_player_stats = get_player_stats(home_team_batting, home_team_pitching)
        away_team_stats = get_team_stat(away_team_batting, away_team_pitching)
        home_team_stats = get_team_stat(home_team_batting, home_team_pitching)
        return {
            "time": time,
            "plays": plays,
            "away_player_stats": away_player_stats,
            "home_player_stats": home_player_stats,
            "away_team_stats": away_team_stats,
            "home_team_stats": home_team_stats,
        }
