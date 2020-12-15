from scrapers.basketball_reference import BasketballReferenceScraper
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


class NbaGameScraper(BasketballReferenceScraper):
    def get_resource(self, args):
        games = []
        for month in NBA_MONTHS:
            season = args["season"]
            endpoint = f"leagues/NBA_{season}_games-{month}.html"
            css_selectors = ("#schedule",)
            games_table = self.get_tables(endpoint, css_selectors)[0]
            css_config = {"rows": "tr:not(.thead)", "cells": "th, td"}
            table_rows = self.get_table_rows(games_table, css_config)
            games += [NbaGame(row).toJson() for row in table_rows]

        return {"games": games}
