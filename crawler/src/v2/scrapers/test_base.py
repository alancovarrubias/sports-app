import pytest
from selenium.common.exceptions import WebDriverException
from v2.scrapers.base import BaseScraper


class DummyScraper(BaseScraper):
    def parse_data(self):
        return {}


@pytest.fixture
def scraper(mocker):
    mocker.patch("v2.scrapers.base.init_driver")
    return DummyScraper()


def test_retry_on_navigation_retries_once_then_succeeds(scraper):
    calls = {"n": 0}

    def action():
        calls["n"] += 1
        if calls["n"] == 1:
            raise WebDriverException("aborted by navigation: Inspected target navigated")
        return "ok"

    assert scraper.retry_on_navigation(action) == "ok"
    assert calls["n"] == 2


def test_retry_on_navigation_reraises_unrelated_webdriver_errors(scraper):
    def action():
        raise WebDriverException("some other failure")

    with pytest.raises(WebDriverException, match="some other failure"):
        scraper.retry_on_navigation(action)


def test_retry_on_navigation_gives_up_after_retries_exhausted(scraper):
    def action():
        raise WebDriverException("aborted by navigation")

    with pytest.raises(WebDriverException, match="aborted by navigation"):
        scraper.retry_on_navigation(action, retries=2)
