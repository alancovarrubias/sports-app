from flask import request
from v2.db_manager import DbManager


def scrape_url(Scraper, url, *args, sport=None, resource_type=None, cache_key=None):
    """Scrape a URL, optionally caching the result in MongoDB.

    Args:
        Scraper: The scraper class to use
        url: The URL to scrape
        *args: Additional arguments to pass to parse_data
        sport: Sport name for caching (e.g., 'mlb', 'nba')
        resource_type: Resource type for caching (e.g., 'teams', 'games')
        cache_key: Unique key for this cached resource

    If sport, resource_type, and cache_key are provided, caching is enabled.
    Use ?refetch=1 query param to force re-scraping.
    """
    print(url)

    # If caching params provided, use cache
    if sport and resource_type and cache_key:
        db = DbManager(sport, resource_type)
        refetch = request.args.get("refetch", type=int)

        if refetch:
            db.delete_resource(cache_key)

        if db.resource_exists(cache_key):
            return db.fetch_resource(cache_key)

        # Scrape and cache
        with Scraper(url) as scraper:
            data = scraper.parse_data(*args)
        db.save_resource(cache_key, data.copy())
        return data

    # No caching - just scrape
    with Scraper(url) as scraper:
        return scraper.parse_data(*args)
