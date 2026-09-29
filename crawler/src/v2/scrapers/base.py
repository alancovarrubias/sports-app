import os
import time
from abc import ABC, abstractmethod
from selenium.common.exceptions import StaleElementReferenceException, WebDriverException
from v2.scrapers.element_wrapper import ElementWrapper
from v2.scrapers.init_driver import init_driver

FIXTURE_DIR = "/project/tmp"

class BaseScraper(ABC):
    wait_for_selector = None

    def __init__(self, url=None):
        self.driver = init_driver()
        if url:
            self.fetch(url)

    def fetch(self, url):
        self.retry_on_navigation(lambda: self._load(url))

    def _load(self, url):
        self.driver.get(url)
        self._wait_until_ready()

    def _wait_until_ready(self):
        if self.wait_for_selector:
            self.wait_for(self.wait_for_selector)
        else:
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
            self._wait_until_ready()
            with open(path, "w", encoding="utf-8") as f:
                f.write(self.driver.page_source)

    def retry_on_navigation(self, action, retries=2):
        """Retry an action that ESPN's live pages can interrupt mid-command.

        Gamecast/boxscore pages sometimes navigate or reload themselves
        moments after the initial load, which aborts whatever Selenium
        command is in flight with a WebDriverException. Retrying the whole
        action once is enough to land after the page has settled.
        """
        for attempt in range(retries):
            try:
                return action()
            except WebDriverException as e:
                if "aborted by navigation" not in str(e) or attempt == retries - 1:
                    raise

    def retry_on_stale(self, lookup, retries=3):
        """Re-run a lookup that chains multiple element handles together.

        ESPN's live-game pages re-render their DOM on their own polling
        cadence, which can invalidate an element handle between when it's
        fetched and when it's next used. Re-running the whole lookup
        re-fetches every handle from scratch, so a mid-chain re-render just
        costs a retry instead of a crash.
        """
        for attempt in range(retries):
            try:
                return lookup()
            except StaleElementReferenceException:
                if attempt == retries - 1:
                    raise

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
