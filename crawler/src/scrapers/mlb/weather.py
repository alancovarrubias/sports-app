from urllib.request import urlopen
import json

API_KEY = "6532d6454b8aa370768e63d6ba5a832e"


class MlbWeatherScraper:
    driver = None

    def get_resource(self, args):
        lat = args["lat"]
        lng = args["lng"]
        start_date = args["start_date"]
        end_date = args["end_date"]
        url = f"https://api.weather.com/v1/geocode/{lat}/{lng}/observations/historical.json?apiKey={API_KEY}&startDate={start_date}&endDate={end_date}&units=e"
        page = urlopen(url)
        json_data = json.loads(page.read())
        return {"weather_data": json_data}
