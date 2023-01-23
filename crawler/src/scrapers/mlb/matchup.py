from scrapers.espn import EspnScraper
from models.mlb.matchup import MlbMatchup


class MlbMatchupScraper(EspnScraper):
    def get_resource(self, args):
        date = args["date"]
        endpoint = f"mlb/schedule/_/date/{date}"
        self.get(endpoint)
        schedule_table = self.find_element(".schedule")
        schedule_rows = self.get_table_rows(schedule_table)
        data = []
        matchups = [MlbMatchup(row).toJson() for row in schedule_rows]
        for matchup in matchups:
            game_id = matchup["game_id"]
            endpoint = f"mlb/game/_/gameId/{game_id}"
            self.get(endpoint)
            wrappers = self.driver.find_elements(By.CSS_SELECTOR, ".caption-wrapper")
            if len(wrappers) == 0:
                stadium = self.find_element(".game-location").text
            else:
                stadium = wrappers[0].text
            datum = {
                "away_team": matchup["away_team"],
                "home_team": matchup["home_team"],
                "location": self.find_element(".icon-location-solid-before").text,
                "capacity": self.find_element(".attendance").text,
                "time": self.find_element(".game-time").text,
                stadium: stadium,
            }
            data.append(datum)

        return {"matchups": data}
