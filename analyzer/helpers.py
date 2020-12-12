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


def combine_stats(stats, attributes):
    summed_stat = {}
    for attr in attributes:
        summed_stat[attr] = sum_stats_attr(stats, attr)
    return summed_stat


def sum_stats_attr(stats, attr):
    attrs = [stat[attr] for stat in stats]
    return sum(attrs)


def sum_attributes(attributes, dict1, dict2):
    summed = {}
    for attr in attributes:
        summed[attr] = dict1[attr] + dict2[attr]
    return summed


def subtract_attributes(attributes, dict1, dict2):
    subtracted = {}
    for attr in attributes:
        subtracted[attr] = dict1[attr] - dict2[attr]
    return subtracted
