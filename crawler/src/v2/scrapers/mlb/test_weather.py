from v2.url_builders.weather_api import WeatherApiUrlBuilder


def test_url():
    url = WeatherApiUrlBuilder().historical(40.8296, -73.9262, "20240405", "20240405")
    assert url == (
        "https://api.weather.com/v1/geocode/40.8296/-73.9262/observations/"
        "historical.json?apiKey=6532d6454b8aa370768e63d6ba5a832e"
        "&startDate=20240405&endDate=20240405&units=e"
    )


def test_fetch_weather(mocker):
    mock_urlopen = mocker.patch("v2.scrapers.mlb.weather.urlopen")
    mock_urlopen.return_value.__enter__.return_value.read.return_value = b'{"temp": 72}'

    from v2.scrapers.mlb.weather import fetch_weather
    assert fetch_weather("http://example.com") == {"weather_data": {"temp": 72}}
