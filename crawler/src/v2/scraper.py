from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os


class Scraper:
    def __init__(self, url, cache=None):
        self.init_driver()
        self.drive_url_with_cache(url, cache)

    def init_driver(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.page_load_strategy = "eager"
        self.driver = webdriver.Chrome(options=chrome_options)

    def drive_url_with_cache(self, url, cache):
        file_path = f"/project/tmp/{cache}"
        if os.path.exists(file_path):
            self.driver.get(f"file://{file_path}")
        else:
            self.driver.get(url)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(self.driver.page_source)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        if self.driver:
            self.driver.quit()
