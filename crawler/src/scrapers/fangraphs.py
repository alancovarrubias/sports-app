from scrapers.abstract import AbstractScraper


FANGRAPHS_URL = "https://www.fangraphs.com"


class FangraphsScraper(AbstractScraper):
    def __init__(self):
        super().__init__(FANGRAPHS_URL)
