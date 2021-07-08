from models.abstract import AbstractModel
from helpers.numeric import convert_numeric, convert_percentage


class MlbFullSeasonAdvancedPitchingStat(AbstractModel):
    def __init__(self, row):
        super().__init__(row)

    def build(self, row):
        self.name = row[1].text
        self.ip = convert_numeric(row[3].text)
        self.fa = convert_percentage(row[4].text)
        self.fc = convert_percentage(row[5].text)
        self.fs = convert_percentage(row[6].text)
        self.si = convert_percentage(row[7].text)
        self.ch = convert_percentage(row[8].text)
        self.sl = convert_percentage(row[9].text)
        self.cu = convert_percentage(row[10].text)
        self.fip_minus = convert_numeric(row[11].text)
        self.siera = convert_numeric(row[12].text)
