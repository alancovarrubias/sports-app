from selenium.webdriver.common.by import By
from models.abstract import AbstractModel


def get_team(cell):
    link = cell.find_element(By.TAG_NAME, "a").get_attribute("href")
    return link.split("/")[-2].upper()


def get_game_id(cell):
    link = cell.find_element(By.TAG_NAME, "a").get_attribute("href")
    return link.split("/")[-1]


class MlbMatchup(AbstractModel):
    def build(self, row):
        self.away_team = get_team(row[0])
        self.home_team = get_team(row[1])
        self.game_id = get_game_id(row[2])
