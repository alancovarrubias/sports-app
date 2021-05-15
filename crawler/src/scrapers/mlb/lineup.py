from scrapers.baseball_press import BaseballPressScraper
from selenium.webdriver.common.by import By


def get_players(col):
    players = col.find_elements(By.CLASS_NAME, 'player')
    return [player.text for player in players]

class MlbLineupScraper(BaseballPressScraper):
    def get_resource(self, args):
        date = args["date"]
        endpoint = f"lineups/{date}"
        self.get(endpoint)
        lineups = self.driver.find_elements(By.CLASS_NAME, "lineup-card")
        for lineup in lineups:
            rows = lineup.find_element(By.CLASS_NAME, "lineup-card-header").find_elements(By.CLASS_NAME, 'row')
            team_row = rows[0].find_elements(By.CLASS_NAME, 'col')
            pitcher_row = rows[1].find_elements(By.CLASS_NAME, 'col')
            away_team = team_row[0].text
            home_team = team_row[2].text
            time = team_row[1].text
            away_pitcher = pitcher_row[0].text
            home_pitcher = pitcher_row[1].text

            body_cols = lineup.find_element(By.CLASS_NAME, "lineup-card-body").find_elements(By.CLASS_NAME, 'col')
            away_players = get_players(body_cols[0])
            home_players = get_players(body_cols[1])