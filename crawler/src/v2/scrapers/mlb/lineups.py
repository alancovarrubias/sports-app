from v2.scrapers.base import BaseScraper


class LineupsScraper(BaseScraper):
    def parse_data(self):
        cards = self.find_elements(".lineup-card")
        return {"lineups": [self._parse_card(card) for card in cards]}

    def _parse_card(self, card):
        header_rows = card.find_element(".lineup-card-header").find_elements(".row")
        team_cols = header_rows[0].find_elements(".col")
        pitcher_cols = header_rows[1].find_elements(".col")
        body_cols = card.find_element(".lineup-card-body").find_elements(".col")
        return {
            "away_team": team_cols[0].text,
            "home_team": team_cols[2].text,
            "local_time": team_cols[1].text.split("\n")[1],
            "away_pitcher": pitcher_cols[0].text,
            "home_pitcher": pitcher_cols[1].text,
            "away_players": self._players(body_cols[0]),
            "home_players": self._players(body_cols[1]),
        }

    def _players(self, col):
        return [p.text for p in col.find_elements(".player")]
