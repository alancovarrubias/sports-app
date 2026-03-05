import io
import json
from v2.url_builders.fangraphs import FangraphsUrlBuilder
from v2.scrapers.mlb.advanced_stats import fetch_advanced_stats, PIT_HANDED


def test_batting_full_season_url():
    url = FangraphsUrlBuilder("LAD", 2024).batting_full_season()
    assert "/api/leaders/major-league/data?" in url
    assert "stats=bat" in url
    assert "team=22" in url
    assert "season=2024" in url
    assert "month=0" in url


def test_pitching_vs_left_url():
    url = FangraphsUrlBuilder("NYY", 2024).pitching_vs_left()
    assert "stats=pit" in url
    assert "team=9" in url
    assert "month=13" in url


def test_all_eight_splits_produce_distinct_urls():
    b = FangraphsUrlBuilder("BOS", 2024)
    urls = {
        b.batting_full_season(), b.batting_vs_left(),
        b.batting_vs_right(), b.batting_last_14(),
        b.pitching_full_season(), b.pitching_vs_left(),
        b.pitching_vs_right(), b.pitching_last_30(),
    }
    assert len(urls) == 8


def test_fetch_advanced_stats(mocker):
    payload = {
        "data": [
            {"PlayerName": "Gerrit Cole", "IP": 32.0, "WHIP": 0.72,
             "LD%": 0.16, "SO": 30.0, "BB": 7.0, "ERA": 2.1,
             "FB%": 0.4, "xFIP": 3.2, "K/BB": 4.3, "wOBA": 0.28,
             "GB%": 0.44, "H": 16.0, "extra": "ignored"},
        ]
    }
    m = mocker.patch("v2.scrapers.mlb.advanced_stats.urlopen", autospec=True)
    m.return_value.__enter__.return_value = io.BytesIO(json.dumps(payload).encode())

    result = fetch_advanced_stats("http://x", PIT_HANDED)

    cole = result["stats"][0]
    assert cole["name"] == "Gerrit Cole"
    assert cole["ip"] == 32.0
    assert cole["whip"] == 0.72
    assert cole["kbb"] == 4.3
    assert "extra" not in cole
