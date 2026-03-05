import re
from v2.scrapers.base import BaseScraper


class GamesScraper(BaseScraper):
    """Scrapes one team's full-season schedule, returning only home games."""

    def parse_data(self):
        rows = self.table_rows("#team_schedule", "tbody tr:not(.thead)")
        home_rows = [r for r in rows if r[3].text != "@"]
        return {
            "games": [self._parse_game(row) for row in home_rows],
            "team_link": self._team_link(home_rows[0]),
        }

    def _parse_game(self, row):
        date_text = row[0].text
        double_header = re.search(r"(?<=\()\d(?=\))", date_text)
        return {
            "date": row[0].get_attribute("csk"),
            "home_team": row[2].text,
            "away_team": row[4].text,
            "num": int(double_header.group()) if double_header else 0,
        }

    def _team_link(self, row):
        href = row[1].find_element("a").get_attribute("href")
        return re.search(r"[A-Z]{3}", href).group()
