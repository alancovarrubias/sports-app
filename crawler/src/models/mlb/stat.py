import re
from const.mlb import PITCHING, BATTING
from const.models import PLAYER
from models.abstract import AbstractModel
from helpers.numeric import convert_numeric
from selenium.webdriver.common.by import By


ABBR_REGEX = r"[a-z.]*\d{2}"


def get_name(cell):
    anchor = cell.find_element(By.TAG_NAME, "a")
    return anchor.text


def get_abbr(cell):
    anchor = cell.find_element(By.TAG_NAME, "a")
    abbr = re.search(ABBR_REGEX, anchor.get_attribute("href")).group()
    return abbr


def get_position(cell):
    return cell.text.split(" ")[-1]


class MlbStat(AbstractModel):
    def __init__(self, stat_type, model_type, row):
        self.stat_type = stat_type
        self.model_type = model_type
        super().__init__(row)

    def build(self, row):
        if self.model_type == PLAYER:
            cell = row[0]
            self.name = get_name(cell)
            self.abbr = get_abbr(cell)
            self.position = get_position(cell)

        row_text = [cell.text for cell in row]
        if self.stat_type == PITCHING:
            self.add_pitching_stat(row_text)
        elif self.stat_type == BATTING:
            self.add_batting_stat(row_text)

    def add_batting_stat(self, row_text):
        self.ab = convert_numeric(row_text[1])
        self.r = convert_numeric(row_text[2])
        self.h = convert_numeric(row_text[3])
        self.rbi = convert_numeric(row_text[4])
        self.bb = convert_numeric(row_text[5])
        self.so = convert_numeric(row_text[6])
        self.pa = convert_numeric(row_text[7])
        self.ba = convert_numeric(row_text[8])
        self.obp = convert_numeric(row_text[9])
        self.slg = convert_numeric(row_text[10])
        self.ops = convert_numeric(row_text[11])

    def add_pitching_stat(self, row_text):
        self.ip = convert_numeric(row_text[1])
        self.h = convert_numeric(row_text[2])
        self.r = convert_numeric(row_text[3])
        self.er = convert_numeric(row_text[4])
        self.bb = convert_numeric(row_text[5])
        self.so = convert_numeric(row_text[6])
        self.hr = convert_numeric(row_text[7])
        self.era = convert_numeric(row_text[8])
