from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from abc import ABC, abstractmethod
import time
from v2.scrapers.element_wrapper import ElementWrapper

class BaseScraper(ABC):
    def __init__(self, url):
        self.driver = self.init_driver()
        self.driver.get(url)
        time.sleep(3)

    def init_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.page_load_strategy = "eager"
        return webdriver.Chrome(options=chrome_options)

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