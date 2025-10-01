from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

class ElementWrapper:
    def __init__(self, element):
        self.element = element

    def contains_element(self, selector):
        elements = self.element.find_elements(By.CSS_SELECTOR, selector)
        return True if elements else False

    def find_elements(self, selector):
        return [ElementWrapper(el) for el in self.element.find_elements(By.CSS_SELECTOR, selector)]

    def find_element(self, selector):
        return ElementWrapper(self.element.find_element(By.CSS_SELECTOR, selector))

    def wait_for(self, selector):
        return ElementWrapper(WebDriverWait(self.element, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, selector))))

    def __getattr__(self, name):
        return getattr(self.element, name)