import re
from v2.scrapers.base import BaseScraper


class PlayersScraper(BaseScraper):
    def parse_data(self):
        rows = self.table_rows("#roster")
        return {"players": [self._parse_player(row) for row in rows]}

    def _parse_player(self, row):
        link = row[0].find_element("a")
        href = link.get_attribute("href")
        return {
            "name": link.text,
            "abbr": re.search(r"\w*\d{2}", href).group(),
            "position": row[1].text,
        }
