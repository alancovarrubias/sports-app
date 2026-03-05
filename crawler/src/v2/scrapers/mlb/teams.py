import re
from v2.scrapers.base import BaseScraper


class TeamsScraper(BaseScraper):
    def parse_data(self):
        # Trailing rows are a league-average summary + repeated header; skip anything
        # without a team link.
        rows = self.table_rows("#teams_standard_batting", cell_sel="th")
        teams = [self._parse_team(row) for row in rows if row[0].contains_element("a")]
        return {"teams": teams}

    def _parse_team(self, row):
        link = row[0].find_element("a")
        href = link.get_attribute("href")
        full_name = link.text
        words = full_name.split()
        split_at = -2 if re.search(r"Sox|Jays", full_name) else -1
        return {
            "abbr": re.search(r"[A-Z]{3}", href).group(),
            "name": " ".join(words[split_at:]),
            "city": " ".join(words[:split_at]),
        }
