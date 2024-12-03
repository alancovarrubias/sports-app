from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def init_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.page_load_strategy = "eager"
    return webdriver.Chrome(options=chrome_options)