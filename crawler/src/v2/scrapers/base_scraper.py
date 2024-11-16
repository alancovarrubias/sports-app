from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from abc import ABC, abstractmethod
import time
import os
from v2.scrapers.element_wrapper import ElementWrapper

class BaseScraper(ABC):
    def fetch(self, *args):
        url = self.build_url(*args)
        self.driver.get(url)
        time.sleep(3)

    def get_sport(self, league):
        if league == 'nfl':
            return 'nfl'
        elif league == 'cfb80' or league == 'cfb81':
            return 'college-football'

    def init_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.page_load_strategy = "eager"
        return webdriver.Chrome(options=chrome_options)

    @abstractmethod
    def build_url(self, *args):
        pass

    @abstractmethod
    def parse_data(self):
        pass

    def get_url_or_file(self, url, file):
        path = f"/project/tmp/{file}"
        if os.path.exists(path):
            self.driver.get(f"file://{path}")
        else:
            self.driver.get(url)
            time.sleep(1)
            with open(path, "w", encoding="utf-8") as f:
                f.write(self.driver.page_source)

    def __enter__(self):
        self.driver = self.init_driver()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if self.driver:
            self.driver.quit()

    def __getattr__(self, name):
        return getattr(ElementWrapper(self.driver), name)
