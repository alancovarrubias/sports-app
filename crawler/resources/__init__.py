from resources.db_manager import DbManager
from crawlers import ScraperFactory


class Resources:
    def __init__(self, key_store):
        self.key_store = key_store

    def fetch(self):
        db_manager = DbManager(self.key_store)
        scraper = ScraperFactory().get_scraper(self.key_store)
        if not db_manager.resource_exists():
            resource_data = scraper.get_resource()
            scraper.web_driver.close()
            db_manager.save_resource(resource_data)
        return db_manager.fetch_resource()
