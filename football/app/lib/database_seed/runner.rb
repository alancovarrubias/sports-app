module DatabaseSeed
  class Runner
    def initialize
      @crawler_client = CrawlerClient.new
    end

    def run(league)
      @league = league
      @schedule_data = schedule_data
      @season = Season.find_or_create_by(year: @schedule_data['year'], league: @league)
      games = @schedule_data['espn_ids'].map { |espn_id| @season.games.find_or_create_by(espn_id: espn_id) }
      games.each { |game| GameUpdater.new(game, @season, week: @schedule_data['week']).run }
    end

    def schedule_data
      case @league
      when :nfl
        @crawler_client.schedule(league: @league)
      when :cfb
        cfb_80_schedule = @crawler_client.schedule(league: :cfb80)
        cfb_81_schedule = @crawler_client.schedule(league: :cfb81)
        cfb_80_schedule['espn_ids'] = cfb_80_schedule['espn_ids'] + cfb_81_schedule['espn_ids']
        cfb_80_schedule
      end
    end
  end
end
