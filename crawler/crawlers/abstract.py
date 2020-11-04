from os import path
from const.sports import NBA, MLB
from const.mlb import BASEBALL_REFERENCE
from const.nba import BASKETBALL_REFERENCE
from abc import ABC, abstractmethod
from crawlers.web_driver import WebDriver

def get_base_url(sport):
    if sport == NBA:
        return BASKETBALL_REFERENCE
    elif sport == MLB:
        return BASEBALL_REFERENCE


class AbstractScraper(ABC):
    def __init__(self, key_store):
        self.web_driver = WebDriver()
        self.base_url = get_base_url(key_store.sport)
        self.key_store = key_store

    def get_tables(self, resource_endpoint, css_selectors):
        resource_url = path.join(self.base_url, resource_endpoint)
        return self.web_driver.get_table_elements(resource_url, css_selectors)

    @abstractmethod
    def get_resource(self):
        pass
