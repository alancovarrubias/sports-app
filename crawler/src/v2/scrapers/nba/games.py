from v2.scrapers.base import BaseScraper

MONTHS = (
    "october", "november", "december", "january",
    "february", "march", "april", "may", "june",
)


class GamesScraper(BaseScraper):
    """Scrapes one month of the NBA schedule. The route iterates MONTHS."""

    def parse_data(self):
        rows = self.table_rows("#schedule", "tbody tr:not(.thead)", "th, td")
        return {"games": [self._parse_game(row) for row in rows]}

    def _parse_game(self, row):
        return {
            "date": row[0].get_attribute("csk")[:-4],
            "away_team": self._team_abbr(row[2]),
            "home_team": self._team_abbr(row[4]),
        }

    def _team_abbr(self, cell):
        return cell.find_element("a").get_attribute("href").split("/")[-2]
