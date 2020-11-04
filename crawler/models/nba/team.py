from models.abstract import AbstractModel
from models.helpers import get_team_abbr
import re

def get_name_city(row):
    full_name = row[0].text
    words = full_name.split()
    word_index = 1 if re.search(r"Blazers", full_name) else -1
    return ' '.join(words[word_index:]), ' '.join(words[:word_index])

class NbaTeam(AbstractModel):
    def build(self, row):
        self.abbr = get_team_abbr(row[0])
        self.name, self.city = get_name_city(row)

