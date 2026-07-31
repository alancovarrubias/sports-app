from v2.scrapers.base import BaseScraper


class LinesScraper(BaseScraper):
    """Scrapes NBA betting lines from ScoresAndOdds."""

    def parse_data(self):
        return {
            "games": self.get_games()
        }

    def get_games(self):
        event_cards = self.find_elements(".event-card")
        games_data = [self.parse_game(card) for card in event_cards]
        return [game for game in games_data if game is not None]

    def parse_game(self, event_card):
        if event_card.contains_element(".delayed"):
            return None
        if event_card.contains_element(".postponed"):
            return None
        event_card_rows = event_card.find_elements(".event-card-row")
        if len(event_card_rows) < 2:
            return None
        return {
            "away_team": self.find_team_data(event_card_rows[0]),
            "home_team": self.find_team_data(event_card_rows[1]),
            "full_game": self.full_game_lines(event_card_rows[1]),
        }

    def find_team_data(self, row):
        return {
            "num": row.find_element(".team-rotation").text,
            "name": row.find_element(".team-name a").text,
        }

    def full_game_lines(self, event_card_row):
        return {
            "spread": self.find_line(event_card_row, "spread"),
            "total": self.find_line(event_card_row, "total"),
        }

    def find_line(self, row, line):
        line_elements = row.find_elements(f'[data-field="live-{line}"]')
        if line_elements:
            line_element = line_elements[0]
        else:
            elements = row.find_elements(f'[data-field="current-{line}"]')
            if not elements:
                return None
            line_element = elements[0]
        return self.find_data_value(line_element)

    def find_data_value(self, element):
        data_value_elements = element.find_elements(".data-value")
        if data_value_elements:
            return data_value_elements[0].text
        return None
