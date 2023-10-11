from selenium.webdriver.common.by import By
from v2.scrapers.base_scraper import BaseScraper
import re
from selenium.webdriver.support import expected_conditions as EC


class LinesScraper(BaseScraper):
    def build_url(self, week, year, league):
        return self.get_url(week, year, self.get_endpoint(league))

    def get_endpoint(self, league):
        if league == 'nfl':
            return 'nfl'
        elif league == 'cfb':
            return 'ncaaf'

    
    def get_url(self, week, year, endpoint):
        if week is None and year is None:
            return f"https://www.scoresandodds.com/{endpoint}"
        else:
            return f"https://www.scoresandodds.com/{endpoint}?week={year}-reg-{week}"
    
    def full_game_lines(self, event_card_row):
        return {
            "spread": self.find_line(event_card_row, 'spread'),
            "total": self.find_line(event_card_row, 'total')
        }
    
    def find_line(self, row, line):
        line_elements = row.find_elements(By.CSS_SELECTOR, f'[data-field="live-{line}"]')
        if line_elements:
            line_element = line_elements[0]
        else:
            line_element = row.find_element(By.CSS_SELECTOR, f'[data-field="current-{line}"]')
        return self.find_data_value(line_element)


    def find_data_value(self, element):
        return element.find_element(By.CSS_SELECTOR, '.data-value').text
    
    def first_half_lines(self, event_card):
        event_id = event_card.get_attribute('id').split('.')[1]
        game_details = event_card.find_element(By.CSS_SELECTOR, '[aria-label="Game Details"]')
        game_details.click()
        element_locator = (By.CSS_SELECTOR, f'#game-props-tab--{event_id}') 
        element = self.wait_for(element_locator)
        element.click()
        element_locator = (By.CSS_SELECTOR, f'#odds-table--first-half-{event_id}')
        first_half_lines = self.wait_for(element_locator)
        rows = first_half_lines.find_elements(By.CSS_SELECTOR, 'tr')
        return {
            "spread": self.find_data_value(rows[1]),
            "total": self.find_data_value(rows[3])
        }


    def find_team_data(self, row):
        return {
            "num": row.find_element(By.CSS_SELECTOR, ".team-rotation").text,
            "name": row.find_element(By.CSS_SELECTOR, ".team-name a").text,
        }
    
    def parse_game(self, event_card):
        event_card_rows = event_card.find_elements(By.CSS_SELECTOR, ".event-card-row")
        return {
            "away_team": self.find_team_data(event_card_rows[0]),
            "home_team": self.find_team_data(event_card_rows[1]),
            "full_game": self.full_game_lines(event_card_rows[1]),
        }

    def close_overlays(self):
        self.driver.find_element(By.CSS_SELECTOR, '.cookie-close').click()
        overlay_element = self.driver.find_element(By.CSS_SELECTOR, "bam-sticky-cta.hydrated")
        self.driver.execute_script("arguments[0].style.display = 'none';", overlay_element)
        for promo in self.driver.find_elements(By.CSS_SELECTOR, '.event-table-promo'):
            self.driver.execute_script("arguments[0].style.display = 'none';", promo)

    def get_week(self):
        week_text = self.driver.find_element(By.CSS_SELECTOR, '[data-content="#week-picker-week"]').text
        return re.search(r'\d{1,2}$', week_text).group()

    def get_games(self):
        event_cards = self.driver.find_elements(By.CSS_SELECTOR, '.event-card')
        return list(map(lambda card: self.parse_game(card), event_cards))

    def parse_data(self):
        return {
            'week': self.get_week(),
            'games': self.get_games()
        }
