module Database
  module Builder
    class SeasonStats < Base
      ID_REGEX = /\d+/
      MODEL_REGEX = /[^\d]+/
      def build
        puts "Building Season Stats #{@season.year}"

        server_options = {
          season_id: @season.id,
        }
        season_stats = query_server(:season_stats, server_options)
        season_stats.each do |key, value|
          id = ID_REGEX.match(key).to_s
          model_name = MODEL_REGEX.match(key).to_s
          model = Object.const_get(model_name).find(id)
          pitching_stat = PitchingStat.find_or_create_by(interval: @season, model: model)
          batting_stat = BattingStat.find_or_create_by(interval: @season, model: model)
          pitching_stat.update(value['pitching_stat'])
          batting_stat.update(value['batting_stat'])
        end
      end

    end
  end
end
