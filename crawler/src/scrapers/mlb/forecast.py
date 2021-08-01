from scrapers.wunderground import WundergroundScraper
from models.mlb.forecast import MlbForecast


def get_team_endpoint(team):
    wunderground_dict = {
        "LAA": "ca/anaheim/92806",
        "BAL": "md/baltimore/21201",
        "BOS": "ma/boston/02215",
        "CHW": "il/chicago/60616",
        "CLE": "oh/cleveland/44115",
        "DET": "mi/detroit/48201",
        "KCR": "mo/kansas-city/64129",
        "MIN": "mn/minneapolis/55403",
        "NYY": "ny/the-bronx/10451",
        "OAK": "ca/oakland/94621",
        "SEA": "wa/seattle/98134",
        "TBR": "fl/st.-petersburg/33705",
        "TEX": "tx/arlington/76011",
        "TOR": "ca/toronto",
        "ARI": "az/phoenix/85004",
        "ATL": "ga/atlanta/30339",
        "CHC": "il/chicago/60613",
        "CIN": "oh/cincinnati/45202",
        "COL": "co/denver/80205",
        "MIA": "fl/miami/33125",
        "HOU": "tx/houston/77002",
        "LAD": "ca/los-angeles/90012",
        "MIL": "wi/milwaukee/53214",
        "WSN": "dc/washington/20003",
        "NYM": "ny/queens/11368",
        "PHI": "pa/philadelphia/19148",
        "PIT": "pa/pittsburgh/15212",
        "STL": "mo/st.-louis/63102",
        "SDP": "ca/san-diego/92101",
        "SFG": "ca/san-francisco/94107",
    }
    return wunderground_dict[team]


class MlbForecastScraper(WundergroundScraper):
    def get_resource(self, args):
        team = args["team"]
        date = args["date"]
        team_endpoint = get_team_endpoint(team)
        endpoint = f"hourly/us/{team_endpoint}/date/{date}"
        self.get(endpoint)
        self.driver.implicitly_wait(15)
        forecast_table = self.find_element("#hourly-forecast-table")
        forecast_rows = self.get_table_rows(forecast_table)
        forecasts = [MlbForecast(row).toJson() for row in forecast_rows]
        return {"forecasts": forecasts}
