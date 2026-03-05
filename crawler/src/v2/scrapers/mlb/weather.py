import json
from urllib.request import urlopen


def fetch_weather(url):
    """Not a selenium scraper — weather.com returns JSON directly."""
    with urlopen(url) as resp:
        return {"weather_data": json.loads(resp.read())}
