import re
from models.abstract import AbstractModel

class MlbGame(AbstractModel):
    def build(self, row):
        self.date = row[0].get_attribute('csk')
        self.home_team = row[2].text
        self.away_team = row[4].text
