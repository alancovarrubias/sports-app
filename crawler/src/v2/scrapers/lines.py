from crawler.src.v2.scrapers.base import BaseScraper
from v2.url_builders.scores_and_odds import ScoresAndOddsUrlBuilder
import re


class LinesScraper(BaseScraper):
    def build_url(self, week, year, league):
        return ScoresAndOddsUrlBuilder(league).line_url(week, year)

    def full_game_lines(self, event_card_row):
        return {
            "spread": self.find_line(event_card_row, 'spread'),
            "total": self.find_line(event_card_row, 'total')
        }
    
    def find_line(self, row, line):
        line_elements = row.find_elements(f'[data-field="live-{line}"]')
        if line_elements:
            line_element = line_elements[0]
        else:
            line_element = row.find_element(f'[data-field="current-{line}"]')
        return self.find_data_value(line_element)


    def find_data_value(self, element):
        return element.find_element('.data-value').text
    
    def first_half_lines(self, event_card):
        event_id = event_card.get_attribute('id').split('.')[1]
        game_details = event_card.find_element('[aria-label="Game Details"]')
        game_details.click()
        element = self.wait_for(f'#game-props-tab--{event_id}')
        element.click()
        first_half_lines = self.wait_for(f'#odds-table--first-half-{event_id}')
        rows = first_half_lines.find_elements('tr')
        return {
            "spread": self.find_data_value(rows[1]),
            "total": self.find_data_value(rows[3])
        }


    def find_team_data(self, row):
        return {
            "num": row.find_element(".team-rotation").text,
            "name": row.find_element(".team-name a").text,
        }
    
    def parse_game(self, event_card):
        event_card_rows = event_card.find_elements(".event-card-row")
        return {
            "away_team": self.find_team_data(event_card_rows[0]),
            "home_team": self.find_team_data(event_card_rows[1]),
            "full_game": self.full_game_lines(event_card_rows[1]),
        }

    def close_overlays(self):
        self.find_element('.cookie-close').click()
        overlay_element = self.find_element("bam-sticky-cta.hydrated")
        self.execute_script("arguments[0].style.display = 'none';", overlay_element)
        for promo in self.find_elements('.event-table-promo'):
            self.execute_script("arguments[0].style.display = 'none';", promo)

    def get_week(self):
        week_text = self.find_element('[data-content="#week-picker-week"]').text
        return re.search(r'\d{1,2}$', week_text).group()

    def get_games(self):
        event_cards = self.find_elements('.event-card')
        return list(map(lambda card: self.parse_game(card), event_cards))

    def parse_data(self):
        return {
            'week': self.get_week(),
            'games': self.get_games()
        }
