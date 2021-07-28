from scrapers.abstract import AbstractScraper


WUNDERGROUND_URL = "https://www.wunderground.com"


class WundergroundScraper(AbstractScraper):
    def __init__(self):
        super().__init__(WUNDERGROUND_URL)
