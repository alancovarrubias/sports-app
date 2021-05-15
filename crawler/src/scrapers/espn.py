
from scrapers.abstract import AbstractScraper


ESPN_URL = "https://www.espn.com"


class EspnScraper(AbstractScraper):
    def __init__(self):
        super().__init__(ESPN_URL)
