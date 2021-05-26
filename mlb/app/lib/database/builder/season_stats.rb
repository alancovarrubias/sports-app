module Database
  module Builder
    class SeasonStats < Base
      def build
        puts "Building Season Stats #{@season.year}"

        server_options = {
          season_id: @season.id,
        }
        season_stats_res = query_server(:season_stats, server_options)
        build_stats(season_stats_res)
      end

      def build_stats(stats_res)
        %i[team player].each do |model|
          stats_res["#{model}_stats"].each do |stat|
            build_stat(stat, team)
          end
        end
      end

      def build_stat(stat, team)
        model_type = stat.delete('model_type')
        abbr = stat.delete('abbr')
        stat_type = stat.delete('stat_type')
        model = model_type == 'Player' ? ::Player.find_by(abbr: abbr, team: team) : team
        model_class = stat_type == 'Pitching' ? ::PitchingStat : ::BattingStat
        model_key = model_type == 'Player' ? model.name : model.abbr
        stat.merge!(hit_types) if hit_types
        stat_query = {
          interval: @season,
          game: @game,
          model: model
        }
        stat_object = model_class.find_or_create_by(stat_query)
        stat_object.update(stat)
      end
    end
  end
end
