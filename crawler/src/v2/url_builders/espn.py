class EspnUrlBuilder:
    def __init__(self, league):
        self.league = league
        self.base_url = f"https://www.espn.com/{self.get_sport()}"

    def boxscore(self, game_id):
        return self.build_url(f"/boxscore/_/gameId/{game_id}")

    def gamecast(self, game_id):
        return self.build_url(f"/game/_/gameId/{game_id}")

    def play_by_play(self, game_id):
        return self.build_url(f"/playbyplay/_/gameId/{game_id}")

    def schedule(self, week, year):
        segments = []
        if year:
            week = week or 1
            segments += [f"week/{week}", f"year/{year}", "seasontype/2"]
        if self.league.startswith("cfb"):
            segments += [f"group/{self.league[-2:]}"]
        path = "/schedule"
        if segments:
            path += "/_/" + "/".join(segments)
        return self.build_url(path)

    def build_url(self, relative_url):
        return f"{self.base_url}{relative_url}"

    def get_sport(self):
        if self.league == 'nfl':
            return 'nfl'
        elif 'cfb' in self.league:
            return 'college-football'