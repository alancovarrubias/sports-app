from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from abc import ABC, abstractmethod


class BaseScraper(ABC):
    def __init__(self):
        self.driver = self.init_driver()

    def fetch(self, *args):
        url = self.build_url(*args)
        self.driver.get(url)

    def init_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.page_load_strategy = "eager"
        return webdriver.Chrome(options=chrome_options)

    @abstractmethod
    def build_url(self, *args):
        pass

    @abstractmethod
    def parse_data(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if self.driver:
            self.driver.quit()