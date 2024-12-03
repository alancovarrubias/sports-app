from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from abc import ABC, abstractmethod
import time
from v2.scrapers.element_wrapper import ElementWrapper
from v2.scrapers.init_driver import init_driver

class BaseScraper(ABC):
    def __init__(self, url):
        self.driver = init_driver()
        self.driver.get(url)
        time.sleep(3)

    @abstractmethod
    def parse_data(self):
        pass

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if self.driver:
            self.driver.quit()

    def __getattr__(self, name):
        return getattr(ElementWrapper(self.driver), name)

#    def get_url_or_file(self, url, file):
#        path = f"/project/tmp/{file}"
#        if os.path.exists(path):
#            self.driver.get(f"file://{path}")
#        else:
#            self.driver.get(url)
#            time.sleep(1)
#            with open(path, "w", encoding="utf-8") as f:
#                f.write(self.driver.page_source)