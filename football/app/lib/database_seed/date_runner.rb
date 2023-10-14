module DatabaseSeed
  class DateRunner
    def initialize
      @crawler_client = CrawlerClient.new
    end

    def run(date)
      Game.includes(:season).where(date: date).each do |game|
        GameUpdater.new(game, game.season).run
      end
    end
  end
end
