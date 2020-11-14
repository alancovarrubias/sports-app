module Database
  module Builder
    class Games < Base
      def needs_data?
        @season.games.empty?
      end

      def build
        return unless needs_data?

        puts "Building Games for Season #{@season.id}"

        teams = @season.teams.map(&:abbr).join(',')
        games_res = query_server(:games, season: @season.year, teams: teams)
        games_res['games'].each do |game_data|
          build_game(game_data)
        end
        games_res['team_links'].each do |abbr, link|
          ::Team.find_by_abbr(abbr).update(link: link)
        end
      end

      def build_game(game_data)
        game_attributes = {
          season: @season,
          date: build_date(game_data['date']),
          away_team: @season.teams.find_by_abbr(game_data['away_team']),
          home_team: @season.teams.find_by_abbr(game_data['home_team']),
          num: game_data['num'].to_i
        }
        ::Game.create(game_attributes)
      end

      def build_date(date)
        Date.new(date[0...4].to_i, date[5...7].to_i, date[8...10].to_i)
      end
    end
  end
end
