def to_num(text):
    """Convert text to int or float. Empty/inf → 0."""
    text = text.strip()
    if not text or text == "inf":
        return 0
    return float(text) if "." in text else int(text)


def to_pct(text):
    """Strip trailing % and convert to number."""
    return to_num(text.rstrip().rstrip("%"))
