module Database
  module Builder
    class Lineups < Base
      PITCHER_REGEX = /.*(?=\ \()/.freeze
      BATTER_REGEX = /(?<=\.\ ).*(?=\ \()/.freeze
      def build
        date = Date.tomorrow
        puts "Creating Lineups for #{date}"
        server_options = {
          date: date
        }
        matchups_res = query_server(:lineups, server_options)
        lineups = matchups_res['lineups']
        lineups.each do |lineup|
          build_game_lineups(lineup, date)
        end
      end

      def build_game_lineups(lineup, date)
        away_team = build_team(lineup['away_team'])
        home_team = build_team(lineup['home_team'])
        game = @season.games.find_by(date: date, away_team: away_team, home_team: home_team)
        zone = ActiveSupport::TimeZone.new('Eastern Time (US & Canada)')
        datetime = zone.parse("#{date} #{lineup['local_time']}")
        game.update(datetime: datetime)
        build_players(lineup, away_team, home_team, game)
      end

      def build_players(lineup, away_team, home_team, game)
        build_pitcher(lineup['away_pitcher'], away_team, game)
        build_pitcher(lineup['home_pitcher'], home_team, game)
        lineup['away_players'].each do |player|
          build_batter(player, away_team, game)
        end
        lineup['home_players'].each do |player|
          build_batter(player, home_team, game)
        end
      end

      def build_team(team_data)
        @season.teams.find_by_name(team_data)
      end

      def build_pitcher(player_data, team, game)
        player_name = player_data.match(PITCHER_REGEX).to_s
        player = Player.find_or_create_by(name: player_name, team: team, season: @season)
        pitching_stat = PitchingStat.find_or_create_by(model: player, game: game, season: @season)
        pitching_stat.update(is_starter: true)
      end

      def build_batter(player_data, team, game)
        player_name = player_data.match(BATTER_REGEX).to_s
        player = Player.find_or_create_by(name: player_name, team: team, season: @season)
        batting_stat = BattingStat.find_or_create_by(model: player, game: game, season: @season)
        batting_stat.update(is_starter: true)
      end
    end
  end
end
