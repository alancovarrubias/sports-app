import time
import unittest
from selenium.webdriver.common.by import By
from web_utils import create_chrome_driver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestWebScraper(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # This runs before all tests
        cls.driver = create_chrome_driver()
        cls.driver.get('https://www.basketball-reference.com/boxscores/201810160BOS.html')  # Replace with your test URL
        with open('page_content.html', 'w', encoding='utf-8') as f:
            f.write(cls.driver.page_source)

    @classmethod
    def tearDownClass(cls):
        # This runs after all tests
        cls.driver.quit()

    def test_title(self):
        # Test if the page title is as expected
        expected_title = "Example Domain"
        actual_title = self.driver.title
        self.assertEqual(actual_title, expected_title)

    def test_content_extraction(self):
        # Test if specific content is present on the page
        expected_content = "This domain is for use in illustrative examples"
        body_text = self.driver.find_element_by_tag_name('body').text
        self.assertIn(expected_content, body_text)

if __name__ == '__main__':
    unittest.main()
