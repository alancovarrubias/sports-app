module Database
  module Builder
    class Players < Base
      def needs_data?(team)
        team.players.empty?
      end

      def build
        @season.teams.each do |team|
          next unless needs_data?(team)

          puts "Building Players for Team #{team.id}"

          res = query_server(:players, season: @season.year, team: team.abbr)
          res['players'].each { |data| build_player(data, team) }
        end
      end

      def build_player(data, team)
        attributes = data.merge(season: @season, team: team)
        Player.create(attributes)
      end
    end
  end
end
