from v2.scrapers.base import BaseScraper


def _minutes_to_seconds(mp):
    parts = mp.split(":")
    if len(parts) == 1:
        return int(parts[0]) * 60
    return int(parts[0]) * 60 + int(parts[1])


def _rtg(text, is_player):
    if not text:
        return None
    return int(text) if is_player else float(text)


class StatsScraper(BaseScraper):
    def parse_data(self, away_team, home_team):
        return {
            "away_player_stats": self._player_stats(away_team),
            "home_player_stats": self._player_stats(home_team),
            "away_team_stats": self._team_stats(away_team),
            "home_team_stats": self._team_stats(home_team),
        }

    def _player_stats(self, team):
        rows = self._combined_rows(team, "tbody tr:not(.thead)")
        return [self._parse_stat(r, is_player=True) for r in rows]

    def _team_stats(self, team):
        rows = self._combined_rows(team, "tfoot tr")
        return [self._parse_stat(rows[0], is_player=False)]

    def _combined_rows(self, team, row_sel):
        basic = self.table_rows(f"#box-{team}-game-basic", row_sel, "th, td")
        adv = self.table_rows(f"#box-{team}-game-advanced", row_sel, "th, td")
        # "Did Not Play" rows have only [name, reason] in the basic table.
        return [b + a for b, a in zip(basic, adv) if len(b) > 2]

    def _parse_stat(self, row, is_player):
        text = [c.text for c in row]
        stat = {
            "sp": _minutes_to_seconds(text[1]),
            "fg": int(text[2]),
            "fga": int(text[3]),
            "fg3": int(text[5]),
            "fg3a": int(text[6]),
            "ft": int(text[8]),
            "fta": int(text[9]),
            "orb": int(text[11]),
            "drb": int(text[12]),
            "ast": int(text[14]),
            "stl": int(text[15]),
            "blk": int(text[16]),
            "tov": int(text[17]),
            "pf": int(text[18]),
            "pts": int(text[19]),
            "ortg": _rtg(text[36], is_player),
            "drtg": _rtg(text[37], is_player),
        }
        if is_player:
            stat["abbr"] = row[0].get_attribute("data-append-csv")
        return stat
