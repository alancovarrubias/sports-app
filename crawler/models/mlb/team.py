import re
from models.abstract import AbstractModel

def get_name_city(anchor):
    title = anchor.get_attribute('title')
    words = title.split(' ')
    word_index = -2 if re.search(r"Sox|Jays", title) else -1
    return ' '.join(words[word_index:]), ' '.join(words[:word_index])

class MlbTeam(AbstractModel):
    def build(self, row):
        anchor = row[0].find_element_by_tag_name('a')
        self.abbr = anchor.text
        self.name, self.city = get_name_city(anchor)
