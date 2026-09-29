import pytest
from v2.routes import scrape_url


class FakeScraper:
    def __init__(self, url):
        self.url = url

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        pass

    def parse_data(self):
        return {"ok": True}


class FailingScraper(FakeScraper):
    def parse_data(self):
        raise RuntimeError("aborted by navigation: Inspected target navigated")


def test_scrape_url_without_cache_returns_data():
    assert scrape_url(FakeScraper, "http://example.com") == {"ok": True}


def test_scrape_url_without_cache_returns_json_error_on_failure(app):
    with app.test_request_context():
        body, status = scrape_url(FailingScraper, "http://example.com")
    assert status == 502
    assert "aborted by navigation" in body.get_json()["error"]


def test_scrape_url_with_cache_returns_json_error_and_skips_save(app, mocker):
    db = mocker.patch("v2.routes.DbManager").return_value
    db.resource_exists.return_value = False

    with app.test_request_context():
        body, status = scrape_url(
            FailingScraper, "http://example.com",
            sport="nfl", resource_type="gamecast", cache_key="123"
        )

    assert status == 502
    db.save_resource.assert_not_called()


@pytest.fixture
def app():
    from v2_app import app as flask_app
    return flask_app
