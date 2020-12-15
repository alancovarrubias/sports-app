from const.mlb import BASEBALL_REFERENCE
from scrapers.abstract import AbstractScraper

class MlbBaseScraper(AbstractScraper):
    def __init__(self):
        super().__init__(BASEBALL_REFERENCE)
