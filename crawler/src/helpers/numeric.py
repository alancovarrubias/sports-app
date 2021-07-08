def convert_numeric(text):
    if len(text) == 0 or text == "inf":
        return 0
    elif "." in text:
        return float(text)
    else:
        return int(text)


def convert_percentage(text):
    return convert_numeric(text[:-1])