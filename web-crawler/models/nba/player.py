from models.abstract import AbstractModel
import re

class NbaPlayer(AbstractModel):
    def build(self, row):
        anchor = row[0].find_element_by_tag_name('a')
        link = anchor.get_attribute('href')
        self.name = anchor.text
        self.abbr = re.search(r"\w*\d{2}", link).group()
        self.position = row[1].text