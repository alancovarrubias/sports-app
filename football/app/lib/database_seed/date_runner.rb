module DatabaseSeed
  class DateRunner
    def initialize
      @url_builder = UrlBuilder.new
      @http_client = HttpClient.new
    end

    def run(date)
      Game.includes(:season).where(date: date).each do |game|
        @game = game
        @league = game.season.league
        build_game
      end
    end

    def build_game
      if @game.game_clock&.include?('Final') || @game.start_time && DateTime.now < @game.start_time || @game.game_clock == 'Halftime'
        return
      end

      @boxscore_data = @http_client.get(@url_builder.boxscore(espn_id: @game.espn_id, league: @league))
      game_clock = @boxscore_data['game_clock']
      if game_clock == 'Not Started'
        @game.update(game_clock: game_clock)
        return
      end

      finished = game_clock.include?('Final') ? 1 : 0
      update_kicked(@game.espn_id, finished) unless @game.kicked
      build_stat('away_team')
      build_stat('home_team')
      @game.update(game_clock: game_clock)
    end

    def update_kicked(espn_id, finished)
      @playbyplay_data = @http_client.get(@url_builder.playbyplay(espn_id: espn_id, finished: finished,
                                                                  league: @league))
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
      team_data.delete('name')
      team_data.delete('abbr')
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
