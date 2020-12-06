import json


def safe_div(numerator, denominator):
    if denominator == 0:
        return 0
    else:
        return numerator / denominator