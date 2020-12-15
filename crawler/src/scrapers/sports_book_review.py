from scrapers.abstract import AbstractScraper

SPORTS_BOOK_REVIEW_URL = "http://www.sportsbookreview.com"


class SportsBookReviewScraper(AbstractScraper):
    def __init__(self):
        super().__init__(SPORTS_BOOK_REVIEW_URL)
