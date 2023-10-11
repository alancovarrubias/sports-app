from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from abc import ABC, abstractmethod
from selenium.webdriver.support import expected_conditions as EC
import time
from selenium.webdriver.support.ui import WebDriverWait

import os


class BaseScraper(ABC):
    def fetch(self, *args):
        url = self.build_url(*args)
        self.driver.get(url)
        time.sleep(3)

    def get_sport(self, league):
        if league == 'nfl':
            return 'nfl'
        elif league == 'cfb':
            return 'college-football'

    def init_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.page_load_strategy = "eager"
        return webdriver.Chrome(options=chrome_options)
    
    def wait_for(self, locator):
        return self.wait.until(EC.presence_of_element_located(locator))

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
        self.wait = WebDriverWait(self.driver, 10)
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if self.driver:
            self.driver.quit()
