from resources.db_manager import DbManager
from crawlers import ScraperFactory


class Resources:
    def __init__(self, key_store):
        self.key_store = key_store
        self.sport = key_store.sport
        self.resource_type = key_store.resource_type
        self.db_key = key_store.db_key

    def fetch(self):
        db_manager = DbManager(self.sport, self.resource_type)
        scraper = ScraperFactory().get_scraper(self.key_store)
        if not db_manager.resource_exists(self.db_key):
            resource_data = scraper.get_resource(self.db_key)
            scraper.web_driver.close()
            db_manager.save_resource(self.db_key, resource_data)
        return db_manager.fetch_resource(self.db_key)
