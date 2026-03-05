from v2.scrapers.base import BaseScraper


class PlayersScraper(BaseScraper):
    # baseball-reference renamed #team_batting to #players_standard_batting.
    # Column layout also shifted: name is now td[0], position is td[2].
    def parse_data(self):
        rows = self.table_rows("#players_standard_batting")
        return {"players": [self._parse_player(row) for row in rows]}

    def _parse_player(self, row):
        name_cell = row[0]
        return {
            "name": name_cell.find_element("a").text,
            "abbr": name_cell.get_attribute("data-append-csv"),
            "position": row[2].text,
        }
