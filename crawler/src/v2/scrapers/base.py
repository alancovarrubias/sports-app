import os
import time
from abc import ABC, abstractmethod
from v2.scrapers.element_wrapper import ElementWrapper
from v2.scrapers.init_driver import init_driver

FIXTURE_DIR = "/project/tmp"


class BaseScraper(ABC):
    def __init__(self, url=None):
        self.driver = init_driver()
        if url:
            self.fetch(url)

    def fetch(self, url):
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

    def get_url_or_file(self, url, filename):
        """Load from cached HTML fixture if it exists, otherwise fetch and cache."""
        os.makedirs(FIXTURE_DIR, exist_ok=True)
        path = os.path.join(FIXTURE_DIR, filename)
        if os.path.exists(path):
            self.driver.get(f"file://{path}")
        else:
            self.driver.get(url)
            time.sleep(3)
            with open(path, "w", encoding="utf-8") as f:
                f.write(self.driver.page_source)

    def table_rows(self, selector, row_sel="tbody tr", cell_sel="td"):
        """Parse an HTML table into a 2D list of ElementWrappers.

        Returns rows that contain at least one cell. Empty rows are skipped.
        """
        table = self.find_element(selector)
        rows = []
        for row in table.find_elements(row_sel):
            cells = row.find_elements(cell_sel)
            if cells:
                rows.append(cells)
        return rows
