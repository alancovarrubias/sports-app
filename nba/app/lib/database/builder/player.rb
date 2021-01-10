module Database
  module Builder
    class Player < Base
      def build
        @season.teams.each do |team|
          next unless needs_data?(team)

          puts "Building Players for Team #{team.id}"

          server_options = { season: @season.year, team: team.abbr }
          players_res = query_server(:players, server_options)
          players_res['players'].each do |player_data|
            build_player(player_data, team)
          end
        end
      end

      def build_player(player_data, team)
        player_attributes = player_data.merge(season: @season, team: team)
        ::Player.create(player_attributes)
      end

      def needs_data?(team)
        team.players.empty?
      end
    end
  end
end
