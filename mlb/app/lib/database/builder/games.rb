module Database
  module Builder
    class Games < Base
      def needs_data?
        @season.games.empty?
      end

      def build
        return unless needs_data?

        puts "Building Games for Season #{@season.id}"

        @season.teams.each do |team|
          res = query_server(:games, season: @season.year, team: team.abbr)
          build_games(res['games'])
          team.update(link: res['team_link'])
        end
      end

      def build_games(games)
        games.each do |data|
          attributes = {
            season: @season,
            date: Date.parse(data['date']),
            away_team: @season.teams.find_by_abbr(data['away_team']),
            home_team: @season.teams.find_by_abbr(data['home_team']),
            num: data['num'].to_i
          }
          Game.create(attributes)
        end
      end
    end
  end
end
