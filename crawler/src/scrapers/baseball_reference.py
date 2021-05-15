from scrapers.abstract import AbstractScraper


BASEBALL_REFERENCE_URL = "https://www.baseball-reference.com"


class BaseballReferenceScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASEBALL_REFERENCE_URL)
