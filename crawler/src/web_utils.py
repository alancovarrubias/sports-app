from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def create_chrome_driver():
    webdriver.chrome.options.Options()
    return webdriver.Chrome()
