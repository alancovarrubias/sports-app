"""Fangraphs advanced stats.

Fangraphs' Cloudflare blocks browser user-agents (including headless chrome)
but lets plain HTTP clients through. So unlike the other scrapers this hits
their JSON API directly with urllib — no selenium.

Specs map our output field names to fangraphs' JSON keys. Pitch-type %s use
the pfx* keys (pitch f/x classification).
"""
import json
from urllib.request import Request, urlopen

BAT_FULL = {
    "pa": "PA", "fa": "pfxFA%", "fc": "pfxFC%", "fs": "pfxFS%",
    "si": "pfxSI%", "ch": "pfxCH%", "sl": "pfxSL%", "cu": "pfxCU%",
}
BAT_HANDED = {
    "ab": "AB", "sb": "SB", "bb": "BB", "so": "SO",
    "slg": "SLG", "obp": "OBP", "woba": "wOBA", "wrc": "wRC",
    "ld_p": "LD%", "gb_p": "GB%", "bb_p": "BB%",
}
PIT_FULL = {
    "ip": "IP", "fa": "pfxFA%", "fc": "pfxFC%", "fs": "pfxFS%",
    "si": "pfxSI%", "ch": "pfxCH%", "sl": "pfxSL%", "cu": "pfxCU%",
    "fip_minus": "FIP-", "siera": "SIERA",
}
PIT_HANDED = {
    "ld_p": "LD%", "whip": "WHIP", "ip": "IP", "so": "SO",
    "bb": "BB", "era": "ERA", "fb_p": "FB%", "xfip": "xFIP",
    "kbb": "K/BB", "woba": "wOBA", "gb_p": "GB%", "h": "H",
}
PIT_LAST_30 = {
    "ld_p": "LD%", "whip": "WHIP", "ip": "IP",
    "so": "SO", "bb": "BB", "siera": "SIERA",
}


def fetch_advanced_stats(url, spec):
    req = Request(url, headers={"User-Agent": "curl/7.88"})
    with urlopen(req) as resp:
        rows = json.loads(resp.read())["data"]
    return {"stats": [_parse_row(r, spec) for r in rows]}


def _parse_row(row, spec):
    stat = {"name": row["PlayerName"]}
    for ours, theirs in spec.items():
        stat[ours] = row.get(theirs)
    return stat
