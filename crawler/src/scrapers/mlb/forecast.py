from scrapers.wunderground import WundergroundScraper
from models.mlb.forecast import MlbForecast


def get_team_endpoint(team):
    wunderground_dict = {
        "LAA": "us/ca/anaheim/92806",
        "BAL": "us/md/baltimore/21201",
        "BOS": "us/ma/boston/02215",
        "CHW": "us/il/chicago/60616",
        "CLE": "us/oh/cleveland/44115",
        "DET": "us/mi/detroit/48201",
        "KCR": "us/mo/kansas-city/64129",
        "MIN": "us/mn/minneapolis/55403",
        "NYY": "us/ny/the-bronx/10451",
        "OAK": "us/ca/oakland/94621",
        "SEA": "us/wa/seattle/98134",
        "TBR": "us/fl/st.-petersburg/33705",
        "TEX": "us/tx/arlington/76011",
        "TOR": "ca/toronto",
        "ARI": "us/az/phoenix/85004",
        "ATL": "us/ga/atlanta/30339",
        "CHC": "us/il/chicago/60613",
        "CIN": "us/oh/cincinnati/45202",
        "COL": "us/co/denver/80205",
        "MIA": "us/fl/miami/33125",
        "HOU": "us/tx/houston/77002",
        "LAD": "us/ca/los-angeles/90012",
        "MIL": "us/wi/milwaukee/53214",
        "WSN": "us/dc/washington/20003",
        "NYM": "us/ny/queens/11368",
        "PHI": "us/pa/philadelphia/19148",
        "PIT": "us/pa/pittsburgh/15212",
        "STL": "us/mo/st.-louis/63102",
        "SDP": "us/ca/san-diego/92101",
        "SFG": "us/ca/san-francisco/94107",
    }
    return wunderground_dict[team]


class MlbForecastScraper(WundergroundScraper):
    def get_resource(self, args):
        team = args["team"]
        date = args["date"]
        team_endpoint = get_team_endpoint(team)
        endpoint = f"hourly/{team_endpoint}/date/{date}"
        print(endpoint)
        self.get(endpoint)
        self.driver.implicitly_wait(15)
        forecast_table = self.find_element("#hourly-forecast-table")
        forecast_rows = self.get_table_rows(forecast_table)
        forecasts = [MlbForecast(row).toJson() for row in forecast_rows]
        return {"forecasts": forecasts}
