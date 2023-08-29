import unittest
from unittest.mock import patch, Mock
from web_utils import create_chrome_driver


class TestWebpageOpen(unittest.TestCase):
    @patch("web_utils.webdriver.chrome.options.Options")
    @patch("web_utils.webdriver.Chrome")
    def test_open_webpage(self, mock_chrome, mock_options):
        create_chrome_driver()
        mock_options.assert_called_once()
        mock_chrome.assert_called_once()


if __name__ == "__main__":
    unittest.main()
