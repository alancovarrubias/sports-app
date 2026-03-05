BASE = "https://www.baseball-reference.com"


class BaseballReferenceUrlBuilder:
    def teams(self, season):
        return f"{BASE}/leagues/MLB/{season}.shtml"

    def players(self, team, season):
        return f"{BASE}/teams/{team}/{season}.shtml"

    def games(self, team, season):
        return f"{BASE}/teams/{team}/{season}-schedule-scores.shtml"

    def boxscore(self, game_url):
        return f"{BASE}/boxes/{game_url[:3]}/{game_url}.shtml"
