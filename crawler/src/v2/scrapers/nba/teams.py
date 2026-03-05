import re
from v2.scrapers.base import BaseScraper


class TeamsScraper(BaseScraper):
    def parse_data(self):
        rows = self.table_rows("#team_vs_team")
        return {"teams": [self._parse_team(row) for row in rows]}

    def _parse_team(self, row):
        link = row[0].find_element("a")
        full_name = link.text
        words = full_name.split()
        split_at = 1 if "Blazers" in full_name else -1
        return {
            "abbr": link.get_attribute("href").split("/")[-2],
            "name": " ".join(words[split_at:]),
            "city": " ".join(words[:split_at]),
        }
