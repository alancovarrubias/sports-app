from scrapers.sports_book_review import SportsBookReviewScraper


class MlbLineScraper(SportsBookReviewScraper):
    def get_resource(self, args):
        season = args["season"]
        endpoint = f"betting-odds/nba-basketball/totals/1st-half"
        self.get(endpoint)
        # css_selectors = ("#roster",)
        # players_table = self.get_tables(endpoint, css_selectors)[0]
        # table_rows = self.get_table_rows(players_table)
        # players = [NbaPlayer(row).toJson() for row in table_rows]
        return {"lines": []}