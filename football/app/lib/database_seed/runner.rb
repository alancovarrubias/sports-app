module DatabaseSeed
  class Runner
    def initialize(league)
      @url_builder = UrlBuilder.new(league)
      @http_client = HttpClient.new
      @league = league
    end

    def run(options = {})
      @schedule_data = get_schedule_data(options)
      @season = Season.find_or_create_by(year: @schedule_data['year'], league: @league)
      @schedule_data['espn_ids'].each { |espn_id| build_game(espn_id) }
    end

    def get_schedule_data(options)
      case @league
      when :nfl
        @http_client.get(@url_builder.schedule(options))
      when :cfb
        cfb_80_schedule = @http_client.get(@url_builder.schedule(options.merge(league: :cfb80)))
        cfb_81_schedule = @http_client.get(@url_builder.schedule(options.merge(league: :cfb81)))
        cfb_80_schedule['espn_ids'] = cfb_80_schedule['espn_ids'] + cfb_81_schedule['espn_ids']
        cfb_80_schedule
      end
    end

    def build_game(espn_id)
      @game = @season.games.find_or_create_by(espn_id: espn_id)
      return if @game.game_clock&.include?('Final') || @game.start_time && DateTime.now < @game.start_time

      @boxscore_data = @http_client.get(@url_builder.boxscore(espn_id))
      update_game
      game_clock = @boxscore_data['game_clock']
      return if game_clock == 'Not Started'

      finished = game_clock == 'Final' ? 1 : 0
      update_kicked(espn_id, finished) unless @game.kicked
      build_stat('away_team')
      build_stat('home_team')
    end

    def update_game
      start_time = DateTime.parse(@boxscore_data['start_time'])
      date = start_time.in_time_zone('Pacific Time (US & Canada)').to_date
      @game.update(
        date: date,
        start_time: start_time,
        game_clock: @boxscore_data['game_clock'],
        week: @schedule_data['week'],
        away_team: build_team('away_team'),
        home_team: build_team('home_team')
      )
    end

    def build_team(team_name)
      team_data = @boxscore_data[team_name]
      name = team_data.delete('name')
      abbr = team_data.delete('abbr')
      team = @season.teams.find_or_create_by(name: name)
      team.update(abbr: abbr)
      team
    end

    def update_kicked(espn_id, finished)
      @playbyplay_data = @http_client.get(@url_builder.playbyplay(espn_id, finished))
      @game.update(kicked: kicked)
    end

    def kicked
      case @playbyplay_data['received']
      when @game.home_team.name
        :away
      when @game.away_team.name
        :home
      end
    end

    def build_stat(team_name)
      team_data = @boxscore_data[team_name]
      team = @game.send(team_name)
      full_game_stat = @game.stats.find_or_create_by(team: team, interval: :full_game)
      team_data['completions'], team_data['attempts'] = team_data.delete('comp_att').split('/')

      team_data = team_data.transform_values(&:to_i)
      full_game_stat.update(team_data)
      return unless @boxscore_data['game_clock'] == 'Halftime'

      first_half_stat = @game.stats.find_or_create_by(team: team, interval: :first_half)
      first_half_stat.update(team_data)
    end
  end
end
