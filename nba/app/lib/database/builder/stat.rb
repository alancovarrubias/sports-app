module Database
  module Builder
    class Stat < Base
      def build
        @season.games.each do |game|
          @game = game
          next unless needs_data?

          puts "Building Stats for Game #{game.id}"

          server_options = {
            game_url: @game.url, home_team: @game.home_team.abbr, away_team: @game.away_team.abbr
          }
          stats_res = query_server(:Stat, server_options)
          build_stats(stats_res)
        end
      end

      private

      def build_stats(stats_res)
        %i[away home].each do |side|
          team = @game.send("#{side}_team")
          %i[team player].each do |model|
            stats_res["#{side}_#{model}_stats"].each do |stat|
              build_stat(stat, team)
            end
          end
        end
      end

      def build_stat(stat, team)
        model_type = stat.delete('model_type')
        abbr = stat.delete('abbr')
        model = model_type == 'Player' ? ::Player.find_by(abbr: abbr, team: team) : team
        stat_query = {
          interval: @game,
          model: model
        }
        stat_object = ::Stat.find_or_create_by(stat_query)
        stat_object.update(stat)
      end

      def needs_data?
        @game.stats.empty?
      end
    end
  end
end
