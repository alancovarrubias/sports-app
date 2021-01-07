class Counter:
    def __init__(self):
        self.wins = 0
        self.losses = 0
        self.skipped = 0

    def win(self):
        self.wins += 1

    def lose(self):
        self.losses += 1

    def skip(self):
        self.skipped += 1