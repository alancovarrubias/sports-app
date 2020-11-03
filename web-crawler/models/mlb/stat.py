import re
from const.mlb import PITCHING, BATTING
from const.models import TEAM, PLAYER
from models.abstract import AbstractModel


def convert_numeric(text):
    if len(text) == 0:
        return 0
    elif "." in text:
        return float(text)
    else:
        return int(text)


def get_abbr(cell):
    anchor = cell.find_element_by_tag_name('a')
    abbr = re.search(r"[a-z]*\d{2}", anchor.get_attribute('href')).group()
    return abbr


class MlbStat(AbstractModel):
    def __init__(self, stat_type, model_type, row):
        self.stat_type = stat_type
        self.model_type = model_type
        super().__init__(row)

    def build(self, row):
        if self.model_type == PLAYER:
            self.abbr = get_abbr(row[0])

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
