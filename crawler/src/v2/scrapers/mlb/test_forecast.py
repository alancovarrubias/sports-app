from v2.scrapers.mlb.forecast import ForecastScraper
from v2.url_builders.wunderground import WundergroundUrlBuilder

SCRAPER = ForecastScraper
URL = "https://www.wunderground.com/hourly/us/ny/the-bronx/10451/date/2026-03-06"
FIXTURE = "mlb_forecast.html"


def test_url(scraper, mock_get):
    scraper.fetch(WundergroundUrlBuilder().hourly("NYY", "2026-03-06"))
    mock_get.assert_called_once_with(URL)


def test_parse_data(loaded):
    forecasts = loaded.parse_data()["forecasts"]

    assert len(forecasts) == 24
    first = forecasts[0]
    assert first["hour"] == 0
    assert isinstance(first["temp"], int)
    assert isinstance(first["humidity"], int)
    assert isinstance(first["pressure"], float)
    assert first["conditions"]
    assert first["wind"]


def test_hours_span_full_day(loaded):
    hours = [f["hour"] for f in loaded.parse_data()["forecasts"]]
    assert hours == list(range(24))
