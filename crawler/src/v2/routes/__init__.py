def scrape_url(Scraper, url, *args):
    print(url)
    with Scraper(url) as scraper:
        return scraper.parse_data(*args)
