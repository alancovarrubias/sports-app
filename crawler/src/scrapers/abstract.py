from os import path
from abc import ABC, abstractmethod
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options


class AbstractScraper(ABC):
    def __init__(self, base_url):
        self.base_url = base_url
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        options = ChromeDriverManager().install()
        self.driver = webdriver.Chrome(options, options=chrome_options)

    def get(self, endpoint):
        url = path.join(self.base_url, endpoint)
        self.driver.get(url)

    def find_element(self, selector):
        return self.driver.find_element_by_css_selector(selector)

    def find_elements(self, selectors):
        elements = [self.find_element(selector) for selector in selectors]
        return elements

    def get_table_rows(self, table, table_selectors=None):
        if table_selectors is None:
            table_selectors = {"rows": "tr", "cells": "td", "section": "tbody"}
        if "rows" not in table_selectors:
            table_selectors["rows"] = "tr"
        if "cells" not in table_selectors:
            table_selectors["cells"] = "td"
        if "section" not in table_selectors:
            table_selectors["section"] = "tbody"
        teams_body = table.find_element_by_tag_name(table_selectors["section"])
        rows = teams_body.find_elements_by_css_selector(table_selectors["rows"])
        table_rows = [
            row.find_elements_by_css_selector(table_selectors["cells"])
            for row in rows
            if row
        ]
        return [row for row in table_rows if row]

    @abstractmethod
    def get_resource(self):
        pass