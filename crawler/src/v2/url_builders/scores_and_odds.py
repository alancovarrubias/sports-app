class ScoresAndOddsUrlBuilder:
    def __init__(self, league):
        self.league = league
        self.base_url = f"https://www.scoresandodds.com/{self.get_sport()}"

    def lines(self, week, year):
        return self.build_url("" if not (week and year) else f"?week={year}-reg-{week}")

    def build_url(self, relative_url):
        return f"{self.base_url}{relative_url}"

    def get_sport(self):
        if self.league == 'nfl':
            return 'nfl'
        elif 'cfb' in self.league:
            return 'ncaaf'

    