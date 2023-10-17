module DatabaseSeed
  class Runner
    def initialize
      @crawler_client = CrawlerClient.new
    end

    def run(league)
      @league = league
      @schedule_data = schedule_data
      @season = Season.find_or_create_by(year: @schedule_data['year'], league: @league)
      @schedule_data['espn_ids'].each do |espn_id|
        GameUpdaterJob.perform_later(espn_id, @season.id, week: @schedule_data['week'])
      end
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
