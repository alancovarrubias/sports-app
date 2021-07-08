from models.abstract import AbstractModel


class MlbFullSeasonAdvancedStat(AbstractModel):
    def __init__(self, row):
        super().__init__(row)

    def build(self, row):
        self.name = row[1].text
        self.fip_minus = row[15].text
        self.siera = row[21].text