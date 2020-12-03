import json


def read_json(file):
    f = open(file, "r")
    data = json.loads(f.read())
    return data


def safe_div(numerator, denominator):
    if denominator == 0:
        return 0
    else:
        return numerator / denominator


def sum_stats(stats, attributes):
    summed_stat = {}
    for attr in attributes:
        summed_stat[attr] = sum_stats_attr(stats, attr)
    return summed_stat


def sum_stats_attr(players, attr):
    attrs = [player[attr] for player in players]
    return sum(attrs)