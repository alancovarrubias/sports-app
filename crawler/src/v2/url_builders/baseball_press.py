BASE = "https://www.baseballpress.com"


class BaseballPressUrlBuilder:
    def lineups(self, date=None):
        # Dated URLs (e.g. /lineups/2024-04-05) now return 404.
        # The base endpoint always returns today's lineups.
        return f"{BASE}/lineups/{date}" if date else f"{BASE}/lineups"
