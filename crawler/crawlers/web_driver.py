from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

class WebDriver:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        options = ChromeDriverManager().install()
        self.driver = webdriver.Chrome(options, options=chrome_options)

    def get_table_elements(self, resource_url, css_selectors):
        self.driver.get(resource_url)
        elements = list(map(self.get_element, css_selectors))
        return elements

    def get_element(self, selector):
        return self.driver.find_element_by_css_selector(selector)

    def close(self):
        self.driver.close()
    