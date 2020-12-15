from resources.db_manager import DbManager
from scrapers import ScraperFactory


class Resources:
    def __init__(self, args):
        self.db_manager = DbManager(args)
        self.scraper_factory = ScraperFactory(args)

    def fetch(self, args):
        if not self.db_manager.resource_exists(args.db_key):
            scraper = self.scraper_factory.get_scraper()
            resource_data = scraper.get_resource(args.query_params)
            scraper.driver.quit()
            self.db_manager.save_resource(args.db_key, resource_data)
        return self.db_manager.fetch_resource(args.db_key)
