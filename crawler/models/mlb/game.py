import re
from models.abstract import AbstractModel

PAREN_REGEX = r'(?<=\()\d(?=\))'
class MlbGame(AbstractModel):
    def build(self, row):
        self.date = row[0].get_attribute('csk')
        self.home_team = row[2].text
        self.away_team = row[4].text
        num_search = re.search(PAREN_REGEX, row[0].text)
        self.num = int(num_search.group()) if num_search else 0
