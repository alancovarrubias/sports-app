import re
from models.abstract import AbstractModel

class MlbPlayer(AbstractModel):
    def build(self, row):
        self.name = row[1].find_element_by_tag_name('a').text
        self.abbr = row[1].get_attribute('data-append-csv')
        self.position = row[0].text
        
