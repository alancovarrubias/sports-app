from flask_restful import Resource
from db_manager import DbManager
from args import Args
from const.sports import MLB, NBA

class BaseResource(Resource):
    def get(self):
        args = Args(self.keys)
        db_manager = DbManager(args.sport, self.resource_type)
        scraper = self.get_scraper(args.sport)()
        if args.refetch:
            db_manager.delete_resource(args.db_key)
        if not db_manager.resource_exists(args.db_key):
            print(args.query_params)
            resource_data = scraper.get_resource(args.query_params)
            if scraper.driver:
                scraper.driver.quit()
            db_manager.save_resource(args.db_key, resource_data)
        return db_manager.fetch_resource(args.db_key)

    def get_scraper(self, sport):
        if (sport == NBA):
            return self.nba_scraper
        elif (sport == MLB):
            return self.mlb_scraper