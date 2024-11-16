class EspnUrlBuilder:
    def __init__(self, league):
        self.league = league
        self.base_url = f"https://www.espn.com/{self.get_sport()}"

    def boxscore(self, game_id):
        return self.build_url(f"/boxscore/_/gameId/{game_id}")

    def play_by_play(self, game_id):
        return self.build_url(f"/playbyplay/_/gameId/{game_id}")

    def schedule(self, week, year):
        if self.league == 'nfl':
            return self.build_url("/schedule" if not (week and year) else f"/schedule/_/week/{week}/year/{year}/seasontype/2")
        elif self.league == 'cfb80' or self.league == 'cfb81':
            num = self.league[-2:]
            return self.build_url(f"/schedule/_/group/{num}" if not (week and year) else f"/schedule/_/week/{week}/year/{year}/seasontype/2/group/{num}")

    def build_url(self, relative_url):
        return f"{self.base_url}{relative_url}"

    def get_sport(self):
        if self.league == 'nfl':
            return 'nfl'
        elif 'cfb' in self.league:
            return 'college-football'