from selenium.webdriver.common.by import By
from models.abstract import AbstractModel


class NflGame(AbstractModel):
    def __init__(self, row, date):
        self.away_team = row[0].text
        self.home_team = row[1].find_element(By.CSS_SELECTOR, ".Table__Team").text
        self.date = date
