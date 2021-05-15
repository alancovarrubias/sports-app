from scrapers.abstract import AbstractScraper


BASEBALL_PRESS_URL = "https://www.baseballpress.com"


class BaseballPressScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASEBALL_PRESS_URL)
