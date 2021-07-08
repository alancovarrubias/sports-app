from models.abstract import AbstractModel
from helpers.numeric import convert_numeric


class MlbFullSeasonAdvancedBattingStat(AbstractModel):
    def __init__(self, row):
        super().__init__(row)

    def build(self, row):
        self.name = row[1].text
        self.pa = convert_numeric(row[3].text)
        self.fa = convert_numeric(row[4].text)
        self.fc = convert_numeric(row[5].text)
        self.fs = convert_numeric(row[6].text)
        self.si = convert_numeric(row[7].text)
        self.ch = convert_numeric(row[8].text)
        self.sl = convert_numeric(row[9].text)
        self.cu = convert_numeric(row[10].text)
