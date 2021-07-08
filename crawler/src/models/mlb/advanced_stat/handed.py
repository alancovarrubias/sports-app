from models.abstract import AbstractModel
from helpers.numeric import convert_numeric, convert_percentage


class MlbHandedAdvancedStat(AbstractModel):
    def __init__(self, row):
        super().__init__(row)

    def build(self, row):
        self.name = row[1].text
        self.ld_p = convert_percentage(row[3].text)
        self.whip = convert_numeric(row[4].text)
        self.ip = convert_numeric(row[5].text)
        self.so = convert_numeric(row[6].text)
        self.bb = convert_numeric(row[7].text)
        self.era = convert_numeric(row[8].text)
        self.fb_p = convert_percentage(row[9].text)
        self.xfip = convert_numeric(row[10].text)
        self.kbb = convert_numeric(row[11].text)
        self.woba = convert_numeric(row[12].text)
        self.gb_p = convert_percentage(row[13].text)
        self.h = convert_numeric(row[14].text)