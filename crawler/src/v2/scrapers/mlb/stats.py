import re
from v2.scrapers.base import BaseScraper
from v2.helpers import to_num

BATTING_FIELDS = ["ab", "r", "h", "rbi", "bb", "so", "pa", "ba", "obp", "slg", "ops"]
PITCHING_FIELDS = ["ip", "h", "r", "er", "bb", "so", "hr", "era"]


def _table_id(team_name):
    """baseball-reference boxscore table ids strip all non-word chars."""
    return re.sub(r"[^\w]", "", team_name)


class StatsScraper(BaseScraper):
    def parse_data(self):
        # away team always listed first in the scorebox
        away, home = self.find_element(".scorebox").find_elements("strong a")
        away_id = _table_id(away.text)
        home_id = _table_id(home.text)
        return {
            "time": self.find_element(".scorebox_meta").find_elements("div")[1].text,
            "plays": self._plays(),
            "away_player_stats": self._player_stats(away_id),
            "home_player_stats": self._player_stats(home_id),
            "away_team_stats": self._team_stats(away_id),
            "home_team_stats": self._team_stats(home_id),
        }

    def _plays(self):
        rows = self.table_rows(
            "#play_by_play",
            "tbody tr:not(.pbp_summary_top):not(.pbp_summary_bottom)",
        )
        plays = []
        for row in rows:
            if len(row) != 11:
                continue
            text = [c.text for c in row]
            plays.append({
                "rob": text[2],
                "pitch_count": text[3],
                "run_out": text[4],
                "at_bat": text[5],
                "batter": text[6],
                "pitcher": text[7],
                "text": text[10],
            })
        return plays

    def _player_stats(self, team_id):
        batting = self._player_rows(f"#{team_id}batting", BATTING_FIELDS, "Batting")
        pitching = self._player_rows(f"#{team_id}pitching", PITCHING_FIELDS, "Pitching")
        return batting + pitching

    def _team_stats(self, team_id):
        batting = self._totals_row(f"#{team_id}batting", BATTING_FIELDS, "Batting")
        pitching = self._totals_row(f"#{team_id}pitching", PITCHING_FIELDS, "Pitching")
        return [batting, pitching]

    def _player_rows(self, selector, fields, stat_type):
        rows = self.table_rows(selector, "tbody tr:not(.spacer)", "th, td")
        return [
            self._parse_stat(row, fields, stat_type, is_player=True)
            for row in rows
            if row[0].text != "Batting"
        ]

    def _totals_row(self, selector, fields, stat_type):
        row = self.table_rows(selector, "tfoot tr", "th, td")[0]
        return self._parse_stat(row, fields, stat_type, is_player=False)

    def _parse_stat(self, row, fields, stat_type, is_player):
        stat = {"stat_type": stat_type}
        if is_player:
            name_cell = row[0]
            link = name_cell.find_element("a")
            stat["name"] = link.text
            stat["abbr"] = re.search(r"[a-z.]*\d{2}", link.get_attribute("href")).group()
            stat["position"] = name_cell.text.split(" ")[-1]
        for i, field in enumerate(fields, start=1):
            stat[field] = to_num(row[i].text)
        return stat
