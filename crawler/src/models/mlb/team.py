import re
from models.abstract import AbstractModel

ABBR_REGEX = r"[A-Z]{3}"

def get_name_city(title):
    words = title.split(" ")
    word_index = -2 if re.search(r"Sox|Jays", title) else -1
    return " ".join(words[word_index:]), " ".join(words[:word_index])


class MlbTeam(AbstractModel):
    def build(self, row):
        anchor = row[0].find_element_by_tag_name("a")
        self.abbr = re.search(ABBR_REGEX, anchor.get_attribute("href")).group()
        self.name, self.city = get_name_city(anchor.text)
