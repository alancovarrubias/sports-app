module Database
  module Builders
    class Stat < Base
      def needs_data?
        @game.pitching_stats.empty? && @game.batting_stats.empty?
      end

      def build
        @season.games.each do |game|
          @game = game
          next unless needs_data?

          server_options = {
            game_url: @game.url, home_team: @game.home_team.full_name, away_team: @game.away_team.full_name
          }
          stats_res = query_server(:stats, server_options)
          build_stats(stats_res)
        end
      end

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
        stat_type = stat.delete('stat_type') == 'Pitching' ? ::PitchingStat : ::BattingStat
        stat_query = {
          season: @season,
          game: @game,
          model: model
        }
        stat_object = stat_type.find_or_create_by(stat_query)
        stat_object.update(stat)
      end
    end
  end
end
