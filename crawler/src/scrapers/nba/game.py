from scrapers.abstract import AbstractScraper
from scrapers.websites import BASKETBALL_REFERENCE_URL
from models.nba.game import NbaGame

NBA_MONTHS = (
    "october",
    "november",
    "december",
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
)

class NbaGameScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASKETBALL_REFERENCE_URL)

    def get_resource(self, args):
        games = []
        for month in NBA_MONTHS:
            season = args["season"]
            endpoint = f"leagues/NBA_{season}_games-{month}.html"
            self.get(endpoint)
            games_table = self.find_element("#schedule")
            css_config = {"rows": "tr:not(.thead)", "cells": "th, td"}
            table_rows = self.get_table_rows(games_table, css_config)
            games += [NbaGame(row).toJson() for row in table_rows]

        return {"games": games}
