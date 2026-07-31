class ScoresAndOddsUrlBuilder:
    def __init__(self, league):
        self.league = league
        self.base_url = f"https://www.scoresandodds.com/{self.get_sport()}"

    def lines(self, week=None, year=None, date=None):
        if date:
            return self.build_url(f"?date={date}")
        if week and year:
            return self.build_url(f"?week={year}-reg-{week}")
        return self.build_url("")

    def build_url(self, relative_url):
        return f"{self.base_url}{relative_url}"

    def get_sport(self):
        if self.league == 'nfl':
            return 'nfl'
        elif 'cfb' in self.league:
            return 'ncaaf'
        elif self.league == 'mlb':
            return 'mlb'
        elif self.league == 'nba':
            return 'nba'
