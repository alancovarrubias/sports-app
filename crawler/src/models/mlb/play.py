from models.abstract import AbstractModel


class MlbPlay(AbstractModel):
    def __init__(self, row):
        super().__init__(row)

    def build(self, row):
        row_text = [cell.text for cell in row]
        self.rob = row_text[2]
        self.pitch_count = row_text[3]
        self.run_out = row_text[4]
        self.at_bat = row_text[5]
        self.batter = row_text[6]
        self.pitcher = row_text[7]
        self.play = row_text[10]