import re
from models.abstract import AbstractModel
from models.helpers import get_team_abbr

class NbaGame(AbstractModel):
    def build(self, row):
        self.date = row[0].get_attribute('csk')[:-4]
        self.away_team = get_team_abbr(row[2])
        self.home_team = get_team_abbr(row[4])
        
