BASE = "https://www.basketball-reference.com"


class BasketballReferenceUrlBuilder:
    def teams(self, season):
        return f"{BASE}/leagues/NBA_{season}_standings.html"

    def players(self, team, season):
        return f"{BASE}/teams/{team}/{season}.html"

    def games(self, season, month):
        return f"{BASE}/leagues/NBA_{season}_games-{month}.html"

    def boxscore(self, game_url):
        return f"{BASE}/boxscores/{game_url}.html"
