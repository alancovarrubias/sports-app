from selenium.webdriver.common.by import By
from models.abstract import AbstractModel


def get_time(cell):
    return cell.text.split("\n")[1]


def get_players(col):
    players = col.find_elements(By.CLASS_NAME, "player")
    return [player.text for player in players]


class MlbLineup(AbstractModel):
    def build(self, lineup):
        rows = lineup.find_element(By.CLASS_NAME, "lineup-card-header").find_elements(
            By.CLASS_NAME, "row"
        )
        team_row = rows[0].find_elements(By.CLASS_NAME, "col")
        pitcher_row = rows[1].find_elements(By.CLASS_NAME, "col")
        self.away_team = team_row[0].text
        self.home_team = team_row[2].text
        self.local_time = get_time(team_row[1])
        self.away_pitcher = pitcher_row[0].text
        self.home_pitcher = pitcher_row[1].text
        body_cols = lineup.find_element(
            By.CLASS_NAME, "lineup-card-body"
        ).find_elements(By.CLASS_NAME, "col")
        self.away_players = get_players(body_cols[0])
        self.home_players = get_players(body_cols[1])