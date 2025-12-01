from models.abstract import AbstractModel
from helpers.numeric import convert_numeric, convert_percentage


class MlbLast30AdvancedPitchingStat(AbstractModel):
    def __init__(self, row):
        super().__init__(row)

    def build(self, row):
        self.name = row[1].text
        self.ld_p = convert_percentage(row[3].text)
        self.whip = convert_numeric(row[4].text)
        self.ip = convert_numeric(row[5].text)
        self.so = convert_numeric(row[6].text)
        self.bb = convert_numeric(row[7].text)
        self.siera = convert_numeric(row[8].text)
