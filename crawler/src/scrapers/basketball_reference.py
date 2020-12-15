from scrapers.abstract import AbstractScraper


BASKETBALL_REFERENCE_URL = "https://www.basketball-reference.com"


class BasketballReferenceScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASKETBALL_REFERENCE_URL)
