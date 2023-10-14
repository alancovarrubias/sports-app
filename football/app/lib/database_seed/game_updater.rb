module DatabaseSeed
  class GameUpdater
    def initialize(game, season, options = {})
      @season = season
      @game = game
      @options = options
      @crawler_client = CrawlerClient.new
    end

    def run
      return if @game.game_clock&.include?('Final') || @game.start_time && DateTime.now < @game.start_time

      @boxscore_data = @crawler_client.boxscore(espn_id: @game.espn_id, league: @season.league)
      update_game
      game_clock = @boxscore_data['game_clock']
      return if game_clock == 'Not Started'

      finished = game_clock == 'Final' ? 1 : 0
      update_kicked(@game.espn_id, finished) unless @game.kicked
      build_stat('away_team')
      build_stat('home_team')
    end

    def update_game
      start_time = DateTime.parse(@boxscore_data['start_time'])
      game_options = @options.merge(
        date: start_time.pacific_time_date,
        start_time: start_time,
        game_clock: @boxscore_data['game_clock'],
        away_team: build_team('away_team'),
        home_team: build_team('home_team')
      )
      @game.update(game_options)
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
      @playbyplay_data = @crawler_client.playbyplay(espn_id: espn_id, finished: finished, league: @season.league)
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
