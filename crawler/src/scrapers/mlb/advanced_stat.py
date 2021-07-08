from scrapers.fangraphs import FangraphsScraper
from models.mlb.advanced_stat.pitching.full_season import (
    MlbFullSeasonAdvancedPitchingStat,
)
from models.mlb.advanced_stat.pitching.handed import MlbHandedAdvancedPitchingStat
from models.mlb.advanced_stat.pitching.last_30 import MlbLast30AdvancedPitchingStat
from models.mlb.advanced_stat.batting.full_season import (
    MlbFullSeasonAdvancedBattingStat,
)
from models.mlb.advanced_stat.batting.handed import MlbHandedAdvancedBattingStat
from helpers.fangraphs import (
    get_fangraph_id,
    build_full_season_batting_endpoint,
    build_left_handed_batting_endpoint,
    build_right_handed_batting_endpoint,
    build_last_14_batting_endpoint,
    build_full_season_pitching_endpoint,
    build_left_handed_pitching_endpoint,
    build_right_handed_pitching_endpoint,
    build_last_30_pitching_endpoint,
)


class MlbAdvancedStatScraper(FangraphsScraper):
    def get_stats_table_rows(self, endpoint):
        self.get(endpoint)
        advanced_stats_table = self.find_element(".rgMasterTable")
        return self.get_table_rows(advanced_stats_table)

    def get_resource(self, args):
        pitching_stats = self.get_pitching_resource(args)
        batting_stats = self.get_batting_resource(args)
        return {"pitching_stats": pitching_stats, "batting_stats": batting_stats}

    def get_batting_resource(self, args):
        season = args["season"]
        team = args["team"]
        fangraph_id = get_fangraph_id(team)
        full_season_endpoint = build_full_season_batting_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(full_season_endpoint)
        full_season_stats = [
            MlbFullSeasonAdvancedBattingStat(row).toJson() for row in table_rows
        ]

        left_handed_endpoint = build_left_handed_batting_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(left_handed_endpoint)
        left_handed_stats = [
            MlbHandedAdvancedBattingStat(row).toJson() for row in table_rows
        ]

        right_handed_endpoint = build_right_handed_batting_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(right_handed_endpoint)
        right_handed_stats = [
            MlbHandedAdvancedBattingStat(row).toJson() for row in table_rows
        ]

        last_14_endpoint = build_last_14_batting_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(last_14_endpoint)
        last_14_stats = [
            MlbHandedAdvancedBattingStat(row).toJson() for row in table_rows
        ]

        return {
            "full_season": full_season_stats,
            "left_handed": left_handed_stats,
            "right_handed": right_handed_stats,
            "last_14": last_14_stats,
        }

    def get_pitching_resource(self, args):
        season = args["season"]
        team = args["team"]
        fangraph_id = get_fangraph_id(team)
        full_season_endpoint = build_full_season_pitching_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(full_season_endpoint)
        full_season_stats = [
            MlbFullSeasonAdvancedPitchingStat(row).toJson() for row in table_rows
        ]

        left_endpoint = build_left_handed_pitching_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(left_endpoint)
        left_handed_stats = [
            MlbHandedAdvancedPitchingStat(row).toJson() for row in table_rows
        ]

        right_endpoint = build_right_handed_pitching_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(right_endpoint)
        right_handed_stats = [
            MlbHandedAdvancedPitchingStat(row).toJson() for row in table_rows
        ]

        last_30_endpoint = build_last_30_pitching_endpoint(season, fangraph_id)
        table_rows = self.get_stats_table_rows(last_30_endpoint)
        last_30_stats = [
            MlbLast30AdvancedPitchingStat(row).toJson() for row in table_rows
        ]

        return {
            "full_season": full_season_stats,
            "left_handed": left_handed_stats,
            "right_handed": right_handed_stats,
            "last_30": last_30_stats,
        }
