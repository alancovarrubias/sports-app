from models.abstract import AbstractModel
from helpers.numeric import convert_numeric, convert_percentage


class MlbHandedAdvancedBattingStat(AbstractModel):
    def __init__(self, row):
        super().__init__(row)

    def build(self, row):
        self.name = row[1].text
        self.ab = convert_numeric(row[3].text)
        self.sb = convert_numeric(row[4].text)
        self.bb = convert_numeric(row[5].text)
        self.so = convert_numeric(row[6].text)
        self.slg = convert_numeric(row[7].text)
        self.obp = convert_numeric(row[8].text)
        self.woba = convert_numeric(row[9].text)
        self.wrc = convert_numeric(row[10].text)
        self.ld_p = convert_percentage(row[11].text)
        self.gb_p = convert_percentage(row[12].text)
        self.bb_p = convert_percentage(row[13].text)