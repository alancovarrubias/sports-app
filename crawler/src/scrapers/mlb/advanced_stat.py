from scrapers.fangraphs import FangraphsScraper
from models.mlb.advanced_stat.full_season import MlbFullSeasonAdvancedStat
from models.mlb.advanced_stat.handed import MlbHandedAdvancedStat


def get_fangraph_id(team):
    if team == "LAA":
        return 1
    elif team == "BAL":
        return 2


def build_endpoint(season, fangraph_id, month, type):
    return f"leaders.aspx?pos=all&stats=pit&lg=all&qual=0&type={type}&season={season}&month={month}&season1={season}&ind=0&team={fangraph_id}&rost=1&age=0&filter=&players=0&page=1_50"


def build_handed_endpoint(season, fangraph_id, month):
    return build_endpoint(
        season, fangraph_id, month, "c,36,31,4,14,11,5,38,43,27,47,37,7"
    )


def build_full_season_endpoint(season, fangraph_id):
    return build_endpoint(season, fangraph_id, "0", "1")


def build_left_handed_endpoint(season, fangraph_id):
    return build_handed_endpoint(season, fangraph_id, "13")


def build_right_handed_endpoint(season, fangraph_id):
    return build_handed_endpoint(season, fangraph_id, "14")


class MlbAdvancedStatScraper(FangraphsScraper):
    def get_stats_table_rows(self, endpoint):
        self.get(endpoint)
        advanced_stats_table = self.find_element(".rgMasterTable")
        return self.get_table_rows(advanced_stats_table)

    def get_resource(self, args):
        season = args["season"]
        team = args["team"]
        fangraph_id = get_fangraph_id(team)
        full_season_endpoint = build_full_season_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(full_season_endpoint)
        full_season_stats = [
            MlbFullSeasonAdvancedStat(row).toJson() for row in table_rows
        ]

        left_endpoint = build_left_handed_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(left_endpoint)
        left_handed_stats = [MlbHandedAdvancedStat(row).toJson() for row in table_rows]

        right_endpoint = build_right_handed_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(right_endpoint)
        right_handed_stats = [MlbHandedAdvancedStat(row).toJson() for row in table_rows]

        return {
            "full_season": full_season_stats,
            "left_handed": left_handed_stats,
            "right_handed": right_handed_stats,
        }
