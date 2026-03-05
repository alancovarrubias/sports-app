"""Shared test fixtures for all v2 scrapers.

Each scraper test module defines two top-level constants:
    URL        - a pinned URL whose page content will not change over time
    FIXTURE    - filename under /project/tmp/ where that page's HTML is cached

On the first test run the HTML is fetched from the live site and written to
disk. Subsequent runs read the cached file, so tests are fast and don't
hammer the target sites.

The `scraper` fixture provides a blank scraper instance (no page loaded) for
asserting that URL construction produces the expected string without actually
navigating anywhere.
"""
import pytest


@pytest.fixture(scope="module")
def scraper(request):
    """Blank scraper for URL-construction tests. Driver.get is never called."""
    cls = request.module.SCRAPER
    with cls() as s:
        yield s


@pytest.fixture(scope="module")
def loaded(request):
    """Scraper with the pinned URL loaded (from cache if available)."""
    cls = request.module.SCRAPER
    with cls() as s:
        s.get_url_or_file(request.module.URL, request.module.FIXTURE)
        yield s


@pytest.fixture
def mock_get(scraper, mocker):
    """Patch driver.get so URL tests don't hit the network."""
    return mocker.patch.object(scraper.driver, "get", autospec=True)
