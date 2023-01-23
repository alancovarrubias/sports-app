from selenium.webdriver.common.by import By
from models.abstract import AbstractModel


class MlbPlayer(AbstractModel):
    def build(self, row):
        self.name = row[1].find_element(By.TAG_NAME, "a").text
        self.abbr = row[1].get_attribute("data-append-csv")
        self.position = row[0].text
