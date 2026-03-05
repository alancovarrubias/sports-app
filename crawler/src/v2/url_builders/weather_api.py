API_KEY = "6532d6454b8aa370768e63d6ba5a832e"


class WeatherApiUrlBuilder:
    def historical(self, lat, lng, start_date, end_date):
        return (
            f"https://api.weather.com/v1/geocode/{lat}/{lng}/observations/"
            f"historical.json?apiKey={API_KEY}&startDate={start_date}"
            f"&endDate={end_date}&units=e"
        )
